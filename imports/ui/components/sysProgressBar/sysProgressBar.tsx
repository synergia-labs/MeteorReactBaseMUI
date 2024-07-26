import React from 'react';
import SysProgressBarStyles from './sysProgressBarStyle';
import {SxProps, Theme} from '@mui/system';


const { Container, ProgressBar } = SysProgressBarStyles;
/**
 * Interface para representar uma barra de progressão.
 */
interface ISysProgressBar {
	/** O valor do progresso da barra. */
	progress?: number | null;
	/** Mapeamento de estilos personalizados para o componente e seus elementos filhos. */
	sxMap?: {
		/** Estilos personalizados para o contêiner da barra de progressão. */
		container?: SxProps<Theme>;
		/** Estilos personalizados para a barra de progressão. */
		progressBar?: SxProps<Theme>;
	};
}

/**
 * O componente SysProgressBar exibe uma barra de progresso personalizável.
 * Ele mostra o progresso de uma determinada tarefa e permite a personalização dos estilos.
 */
const SysProgressBar: React.FC<ISysProgressBar> = ({ progress, sxMap }) => {
	// Estado local para o progresso interno da barra
	const [componentProgress, setComponentProgress] = React.useState<number>(0);
	// Estado local para o hover da barra
	const [hovered, setHovered] = React.useState<boolean>(false);

	React.useEffect(() => {
		// Inicia um temporizador para simular o progresso
		if (!progress) {
			const timer = setInterval(() => {
				setComponentProgress((oldProgress) => {
					if (oldProgress === 100) {
						return 0;
					}
					const diff = Math.random() * 10;
					return Math.round(Math.min(oldProgress + diff, 100));
				});
			}, 500);

			return () => {
				clearInterval(timer);
			};
		}
	}, []);

	// Funções de manipulação do mouse
	const handleMouseEnter = () => {
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
	};

	// Função para formatar o texto do valor
	function valuetext(value: number) {
		return `${value}%`;
	}

	return (
		<Container sx={sxMap?.container}>
			<ProgressBar
				// Usa o progresso passado como prop ou o progresso interno se não houver progresso definido
				value={progress ? progress : componentProgress}
				aria-labelledby="discrete-slider"
				// Exibe o rótulo de valor somente quando o mouse está sobre a barra
				valueLabelDisplay={hovered ? 'on' : 'off'}
				valueLabelFormat={valuetext}
				min={0}
				max={100}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				sx={sxMap?.progressBar}
			/>
		</Container>
	);
};

export default SysProgressBar;
