import React, { useContext } from 'react';
import HomeSection from '../components/section';
import HomeStyles from '../homeStyle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';


const HomeSectionNotificacoes: React.FC = () => {
	const sysLayoutContext = useContext(AppLayoutContext);
  const { RowButtons, } = HomeStyles;

	return (
		<HomeSection
			title="Notificações"
			description="As notificações são mensagens exibidas ao usuário para informar sobre ações realizadas ou necessárias. Elas podem ser personalizadas e possuem diferentes tipos de exibição. Estão acessíveis através do contexto SysAppLayoutContext, que é compartilhado por toda a aplicação. Para usar basta apenas chamar a função showNotification e passar a mensagem desejada.">
			<RowButtons>
				<Button
					color="secondary"
					startIcon={<SysIcon name={'highlightOff'} />}
					onClick={sysLayoutContext.closeNotification}
					sx={{ mr: '1.5rem' }}>
					Fechar Notificação
				</Button>

				<Button
					color="primary"
					startIcon={<SysIcon name={'notification'} />}
					onClick={() => {
						sysLayoutContext.showNotification({
							title: 'Notificação padrão',
							message: 'Esta é uma notificação padrão',
							type: 'default',
							showCloseButton: true,
							actionButtonTex: 'Fechar'
						});
					}}>
					Notificação padrão
				</Button>

				<Button
					color="error"
					startIcon={<SysIcon name={'errorCircle'} />}
					onClick={() => {
						sysLayoutContext.showNotification({
							title: 'Notificação de erro',
							message: 'Teste de notificação de erro',
							type: 'error',
							showCloseButton: true,
							actionButtonTex: 'Fechar'
						});
					}}>
					Notificação de erro
				</Button>

				<Button
					color="warning"
					startIcon={<SysIcon name={'warningAmber'} />}
					onClick={() => {
						sysLayoutContext.showNotification({
							title: 'Notificação de aviso',
							message: 'Teste de notificação de aviso',
							type: 'warning',
							onClickActionButton: () => {}
						});
					}}>
					Notificação de aviso
				</Button>

				<Button
					color="success"
					startIcon={<SysIcon name={'checkCircle'} />}
					onClick={() => {
						sysLayoutContext.showNotification({
							title: 'Notificação de sucesso',
							message: 'Teste de notificação de sucesso',
							type: 'success'
						});
					}}>
					Notificação de sucesso
				</Button>

				<Button
					color="info"
					startIcon={<SysIcon name={'chat'} />}
					onClick={() => {
						sysLayoutContext.showNotification({
							horizontal: 'right',
							children: (
								<Paper
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										borderRadius: '8px',
										border: '1px solid #ccc',
										padding: '6px 24px'
									}}>
									<Avatar sx={{ mr: 2 }}>S</Avatar>
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
										<Typography variant="subtitle1">Synergia</Typography>
										<Typography variant="caption">Olá, seja bem vindo!</Typography>
									</Box>
								</Paper>
							)
						});
					}}>
					Notificação personalizada
				</Button>
			</RowButtons>
		</HomeSection>
	);
};

export default HomeSectionNotificacoes;
