import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';

export interface IPageLayout {
	title: string;
	children?: React.ReactNode;
	actions?: React.ReactNode[];
	hiddenTitleBar?: boolean;
	navigate?: { goBack: () => void };
	onBack?: () => void;
}

export const PageLayout = (props: IPageLayout) => {
	const { title, children, actions, hiddenTitleBar, navigate, onBack } = props;

	const theme = useTheme();

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				maxHeight: '100%'
			}}>
			{!hiddenTitleBar ? (
				<Box
					sx={{
						position: 'relative',
						zIndex: 2,
						top: 0,
						left: 0,
						width: '100%',
						backgroundColor: theme.palette.primary.main
					}}>
					<Container
						sx={{
							backgroundColor: theme.palette.primary.main,
							color: '#FFF',
							height: 45,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}>
							{(onBack || navigate) && (
								<Button
									onClick={() => {
										if (onBack) {
											onBack();
										} else {
											navigate?.goBack();
										}
									}}>
									<ArrowBackIcon style={{ width: 20, height: 20 }} />
								</Button>
							)}
							<Typography
								component={'p'}
								sx={{
									display: 'flex',
									fontSize: '15px',
									fontWeight: 'bold',
									fontStretch: 'normal',
									fontStyle: 'normal',
									lineHeight: 1.2,
									letterSpacing: '0.78px',
									textAlign: 'center',
									color: '#ffffff',
									textTransform: 'none',
									flexDirection: 'row',
									alignItems: 'center'
								}}>
								{title || 'SEM TITULO'}
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}>
							{actions}
						</Box>
					</Container>
				</Box>
			) : null}
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					paddingBottom: hiddenTitleBar ? 60 : undefined,
					overflowX: 'hidden',
					overflowY: 'auto',
					maxHeight: '100%',
					position: 'relative'
				}}>
				<Container
					id={'pageContainer'}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						width: '100%',
						flex: 1,
						padding: 8,
						backgroundColor: theme.palette.background.default
					}}>
					{children}
				</Container>
			</Box>
		</Box>
	);
};
