import React, { useContext } from 'react';
import HomeSection from '../components/section';
import { Button } from '@mui/material';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import ConfirmDialog from '/imports/ui/appComponents/showDialog/custom/confirmDialog/confirmDialog';
import HomeStyles from '../homeStyle';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

const HomeSectionDialogs: React.FC = () => {
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
  	const { RowButtons, } = HomeStyles;

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
			<RowButtons>
				<Button color="secondary" startIcon={<SysIcon name={'highlightOff'} />} onClick={() => sysLayoutContext.closeDialog()}>
					Fechar Dialog
				</Button>

				<Button color="secondary" startIcon={<SysIcon name={'highlightOff'} />} onClick={() => sysLayoutContext.closeModal()}>
					Fechar Modal
				</Button>

				<Button
					color="secondary"
					startIcon={<SysIcon name={'highlightOff'} />}
					onClick={() => sysLayoutContext.closeWindow()}
					sx={{ mr: '1.5rem' }}>
					Fechar window
				</Button>

				<Button
					color="primary"
					startIcon={<SysIcon name={'thumbUpAlt'} />}
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
					startIcon={<SysIcon name={'warningAmber'} />}
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
					startIcon={<SysIcon name={'desktopWindows'} />}
					onClick={() => {
						sysLayoutContext.showWindow({
							urlPath: '/'
						});
					}}>
					Mostrar janela com rota
				</Button>
			</RowButtons>
		</HomeSection>
	);
};

export default HomeSectionDialogs;
