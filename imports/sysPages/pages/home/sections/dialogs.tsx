import React, { useContext } from 'react';
import HomeSection from '../components/section';
import { Button } from '@mui/material';
import { SysAppLayoutContext } from '/imports/app/appLayout';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import DeleteDialog from '/imports/ui/appComponents/SysDialog/custom/deleteDialog/deleteDialog';
import ConfirmDialog from '/imports/ui/appComponents/SysDialog/custom/confirmDialog/confirmDialog';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import HomeStyles from '../homeStyle';

const HomeSectionDialogs: React.FC = () => {
	const sysLayoutContext = useContext(SysAppLayoutContext);

	return (
		<HomeSection
			title="Dialogs, Modais e Windows"
			description={
				<>
					Os Dialogs, Modais e Windows são janelas modais que aparecem sobre a aplicação para informar, confirmar ou
					solicitar ações do usuário. Eles podem ser personalizados e possuem diferentes tipos de exibição. Estão
					acessíveis através do contexto SysAppLayoutContext, que é compartilhado por toda a aplicação. Para usar basta
					apenas chamar a função showDialog e passar as propriedades desejadas. <br />
					<br /> Todos os 3 componentes:
					<span>
						<br />
						<span className="custom-list-item">Dialog</span>
						<br />
						<span className="custom-list-item">Modal</span>
						<br />
						<span className="custom-list-item">Window</span>
						<br />
						<br />
					</span>
					São na verdade um único componente de dialog com parâmetros diferentes. Caso queira renderizar rotas dentro
					deles, opte pelos componente Modal ou Window
				</>
			}>
			<HomeStyles.rowButtons>
				<Button color="secondary" startIcon={<HighlightOffRoundedIcon />} onClick={sysLayoutContext.closeDialog}>
					Fechar Dialog
				</Button>

				<Button color="secondary" startIcon={<HighlightOffRoundedIcon />} onClick={sysLayoutContext.closeModal}>
					Fechar Modal
				</Button>

				<Button
					color="secondary"
					startIcon={<HighlightOffRoundedIcon />}
					onClick={sysLayoutContext.closeWindow}
					sx={{ mr: '1.5rem' }}>
					Fechar window
				</Button>

				<Button
					color="primary"
					startIcon={<ThumbUpAltOutlinedIcon />}
					onClick={() => {
						ConfirmDialog({
							showDialog: sysLayoutContext.showDialog,
							closeDialog: sysLayoutContext.closeDialog,
							title: 'Confirmar cadastro',
							message: 'Tem certeza que deseja confirmar o cadastro dos dados preenchidos?',
							onConfirm: () => {
								sysLayoutContext.showNotification({
									message: 'Dados salvos!'
								});
							}
						});
					}}>
					Dialog de confirmação
				</Button>

				<Button
					color="primary"
					startIcon={<WarningAmberRoundedIcon />}
					onClick={() => {
						DeleteDialog({
							showDialog: sysLayoutContext.showDialog,
							closeDialog: sysLayoutContext.closeDialog,
							title: 'Excluir arquivo',
							message: 'Tem certeza que deseja excluir o arquivo xx.csv?',
							onDeleteConfirm: () => {
								sysLayoutContext.showNotification({
									message: 'Excluído com sucesso!'
								});
							}
						});
					}}>
					Dialog de deleção
				</Button>

				<Button
					color="primary"
					startIcon={<DesktopWindowsOutlinedIcon />}
					onClick={() => {
						sysLayoutContext.showWindow({
							urlPath: '/'
						});
					}}>
					Mostrar janela com rota
				</Button>
			</HomeStyles.rowButtons>
		</HomeSection>
	);
};

export default HomeSectionDialogs;
