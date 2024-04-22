import { validarCPF } from '/imports/libs/validaCPF';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

const sysFormPlaygroundSch: ISchema<ISysFormPlaygroundSch> = {
	name: {
		type: String,
		label: 'Nome',
		defaultValue: 'Teste',
		optional: false,
		validationFunction: (value: string) => {
			const words = value.split(' ');
			if (words.length < 2) return 'O nome deve ter pelo menos um sobrenome';
			if (words.some((word) => word.length < 3)) return 'Todos os nomes devem ter pelo menos 3 caracteres';
			return undefined;
		}
	},
	status: {
		type: String,
		label: 'Estado civil',
		optional: false,
		options: () => [
			{ label: 'Solteiro', value: 'solteiro' },
			{ label: 'Casado', value: 'casado' },
			{ label: 'Divorciado', value: 'divorciado' },
			{ label: 'Viúvo', value: 'viuvo' }
		]
	},
	statusDate: {
		type: Date,
		label: 'Desde quando?',
		optional: false,
		visibilityFunction: (doc: ISysFormPlaygroundSch) =>
			doc.status === 'casado' || doc.status === 'divorciado' || doc.status === 'viuvo'
	},
	cpf: {
		type: String,
		label: 'CPF',
		optional: true,
		validationFunction: (value: string) => {
			if (!validarCPF(value)) return 'CPF inválido';
			return undefined;
		},
		mask: '###.###.###-##'
	},
	phone: {
		type: String,
		label: 'Telefone',
		optional: true,
		mask: '(##) # ####-####'
	},
	birthDate: {
		type: Date,
		label: 'Data de nascimento',
		optional: true
	},
	midia: {
		type: String,
		label: 'Mídia preferida',
		optional: false,
		options: () => [
			{ label: 'Filme', value: 'movie' },
			{ label: 'Série', value: 'serie' },
			{ label: 'Documentário', value: 'documentary' },
			{ label: 'Animação', value: 'animation' },
			{ label: 'Outro', value: 'other' }
		]
	},
	favorites: {
		type: Array<String>,
		label: 'Favoritos',
		optional: true,
		visibilityFunction: (doc) => !!doc.midia && doc.midia !== 'other',
		options: (doc) => {
			if (!doc) return [];
			if (doc.midia === 'movie')
				return [
					{ label: 'Star Wars', value: 'starWars' },
					{ label: 'Harry Potter', value: 'harryPotter' },
					{ label: 'Senhor dos Anéis', value: 'senhorDosAneis' }
				];
			if (doc.midia === 'serie')
				return [
					{ label: 'Friends', value: 'friends' },
					{ label: 'Breaking Bad', value: 'breakingBad' },
					{ label: 'Game of Thrones', value: 'gameOfThrones' }
				];
			if (doc.midia === 'documentary')
				return [
					{ label: 'Our Planet', value: 'ourPlanet' },
					{ label: 'The Social Dilemma', value: 'theSocialDilemma' },
					{ label: 'The Last Dance', value: 'theLastDance' }
				];
			if (doc.midia === 'animation')
				return [
					{ label: 'Rick and Morty', value: 'rickAndMorty' },
					{ label: 'Avatar: The Last Airbender', value: 'avatarTheLastAirbender' },
					{ label: 'Bojack Horseman', value: 'bojackHorseman' }
				];
			return [{ label: 'Outro', value: 'other' }];
		}
	},
	otherFavorite: {
		type: String,
		label: 'Especifique',
		optional: true,
		visibilityFunction: (doc) => !!doc.midia && doc.midia === 'other'
	},
	address: {
		type: Object,
		label: 'Localização',
		defaultValue: '',
		isMapLocation: true,
		optional: true
	},
	temperature: {
		type: Number,
		label: 'Temperatura',
		optional: true
	},
	rate: {
		type: String,
		label: 'Nota',
		optional: true,
		options: () => [
			{ label: '1', value: '1' },
			{ label: '2', value: '2' },
			{ label: '3', value: '3' },
			{ label: '4', value: '4' },
			{ label: '5', value: '5' }
		]
	}
};

interface ISysFormPlaygroundSch extends IDoc {
	name: string;
	status: string;
	statusDate?: Date;
	cpf?: string;
	phone?: string;
	birthDate?: Date;
	midia: 'movie' | 'serie' | 'documentary' | 'animation' | 'other';
	favorites?: Array<string>;
	otherFavorite?: string;
	rate?: string;
	address?: object;
	temperature: number;
}

export { sysFormPlaygroundSch };
export type { ISysFormPlaygroundSch };

export const schemaFormated = `
const sysFormPlaygroundSch : ISchema<ISysFormPlaygroundSch> = {
    name : {
        type: String,
        label: "Nome",
        defaultValue: "Teste",
        optional: false,
        validationFunction: (value: string) => {
            const words = value.split(" ");
            if(words.length < 2) 
                return "O nome deve ter pelo menos um sobrenome"
            if(words.some(word => word.length < 3)) 
                return "Todos os nomes devem ter pelo menos 3 caracteres"
            return undefined
        }
    },
    status : {
        type: String,
        label: "Estado civil",
        optional: false,
        options: () => [
            {label: "Solteiro", value: "solteiro"},
            {label: "Casado", value: "casado"},
            {label: "Divorciado", value: "divorciado"},
            {label: "Viúvo", value: "viuvo"}
        ]
    },
    statusDate : {
        type: Date,
        label: "Desde quando?",
        optional: false,
        visibilityFunction: (doc: ISysFormPlaygroundSch) => !!doc.status && doc.status !== 'solteiro'
    },
    cpf : {
        type: String,
        label: "CPF",
        optional: true,
        validationFunction: (value: string) => {
            if(!validarCPF(value)) return "CPF inválido"
            return undefined;
        },
        mask: "###.###.###-##",
    },
    phone : {
        type: String,
        label: "Telefone",
        optional: true,
        mask: "(##) # ####-####"
    },
    birthDate : {
        type: Date,
        label: "Data de nascimento",
        optional: true
    },
    midia : {
        type: String,
        label: "Mídia preferida",
        optional: false,
        options: () => [
            {label: "Filme", value: "movie"},
            {label: "Série", value: "serie"},
            {label: "Documentário", value: "documentary"},
            {label: "Animação", value: "animation"},
            {label: "Outro", value: "other"}
        ]
    },
    favorites : {
        type: Array<String>,
        label: "Favoritos",
        optional: true,
        visibilityFunction: (doc) => !!doc.midia && doc.midia !== "other",
        options: (doc) => {
            if(!doc) return []
            if(doc.midia === "movie") return [
                {label: "Star Wars", value: "starWars"},
                {label: "Harry Potter", value: "harryPotter"},
                {label: "Senhor dos Anéis", value: "senhorDosAneis"}
            ]
            if(doc.midia === "serie") return [
                {label: "Friends", value: "friends"},
                {label: "Breaking Bad", value: "breakingBad"},
                {label: "Game of Thrones", value: "gameOfThrones"}
            ]
            if(doc.midia === "documentary") return [
                {label: "Our Planet", value: "ourPlanet"},
                {label: "The Social Dilemma", value: "theSocialDilemma"},
                {label: "The Last Dance", value: "theLastDance"}
            ]
            if(doc.midia === "animation") return [
                {label: "Rick and Morty", value: "rickAndMorty"},
                {label: "Avatar: The Last Airbender", value: "avatarTheLastAirbender"},
                {label: "Bojack Horseman", value: "bojackHorseman"}
            ]
            return [
                {label: "Outro", value: "other"}
            ]
        }
    },
    otherFavorite : {
        type: String,
        label: "Especifique",
        optional: true,
        visibilityFunction: (doc) => !!doc.midia && doc.midia === "other"
    },
    rate : {
        type: String,
        label: "Nota",
        optional: true,
        options: () => [
            {label: "1", value: "1"},
            {label: "2", value: "2"},
            {label: "3", value: "3"},
            {label: "4", value: "4"},
            {label: "5", value: "5"}
        ]
    }

}
`;
