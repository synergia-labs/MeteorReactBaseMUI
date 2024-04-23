import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Stepper } from './Stepper/Stepper';

interface ICarrosselProps {
	listaComponentes: JSX.Element[] | undefined;
	posicaoStepper: {
		horizontal: 'left' | 'center' | 'right';
		vertical: {
			posicao: 'up' | 'down';
			margem: string;
		};
	};
}

export const Carrossel = ({ listaComponentes, posicaoStepper }: ICarrosselProps) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [timer, setTimer] = React.useState<any>();

	const indicePrimeiroElemento = 0;
	const indeceUltimoElemento = !!listaComponentes && listaComponentes.length - 1;

	function iniciaTimer() {
		return setInterval(() => {
			if (!!indeceUltimoElemento && activeStep < indeceUltimoElemento) {
				setActiveStep((c) => c + 1);
			} else {
				setActiveStep(indicePrimeiroElemento);
			}
		}, 3000);
	}

	useEffect(() => {
		timer && clearInterval(timer);
		setTimer(iniciaTimer());

		return () => clearInterval(timer);
	}, [activeStep]);

	const handleSetActiveStep = useCallback((step: number) => {
		setActiveStep(step);
	}, []);

	return (
		<Box sx={{ flex: 1 }}>
			{posicaoStepper.vertical.posicao === 'up' && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: posicaoStepper.horizontal,
						marginBottom: posicaoStepper.vertical.margem
					}}>
					<Stepper onActiveStep={activeStep} listComponents={listaComponentes} onSetActiveStep={handleSetActiveStep} />
				</Box>
			)}
			<Box key={activeStep} sx={{ flex: 1 }} className={'elementToFadeInAndOut'}>
				{listaComponentes && listaComponentes.length > 0 && listaComponentes[activeStep]}
			</Box>

			{posicaoStepper.vertical.posicao === 'down' && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: posicaoStepper.horizontal,
						marginTop: posicaoStepper.vertical.margem
					}}>
					<Stepper onActiveStep={activeStep} listComponents={listaComponentes} onSetActiveStep={handleSetActiveStep} />
				</Box>
			)}
		</Box>
	);
};
