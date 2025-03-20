import { nanoid } from 'nanoid';
import { IMeteorError } from '/imports/typings/IMeteorError';

const taskPrefixes = [
	'Completar',
	'Revisar',
	'Atualizar',
	'Planejar',
	'Organizar',
	'Preparar',
	'Analisar',
	'Desenhar',
	'Implementar',
	'Testar'
] as const;

const taskSubjects = [
	'relatório',
	'apresentação',
	'banco de dados',
	'agenda de reunião',
	'plano de projeto',
	'código',
	'design',
	'estratégia',
	'orçamento',
	'cronograma'
] as const;

const tasksNames: Array<string> = Array.from({ length: 100 }, () => {
	const prefix = taskPrefixes[Math.floor(Math.random() * taskPrefixes.length)];
	const subject = taskSubjects[Math.floor(Math.random() * taskSubjects.length)];
	return `${prefix} ${subject}`;
});

const fakeTasks: Array<any> = tasksNames.map((name) => ({
	_id: nanoid(),
	title: name,
	type: ['Categoria A', 'Categoria B', 'Categoria C'][Math.floor(Math.random() * 3)],
	typeMulti: ['alta', 'media', 'baixa'][Math.floor(Math.random() * 3)]
}));

export default fakeTasks;
