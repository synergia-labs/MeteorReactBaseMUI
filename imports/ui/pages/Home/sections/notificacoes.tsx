import React, { useContext } from "react";
import HomeSection from "../components/section";
import { HomePageRowButtons } from "../HomeStyle";
import { Button } from "@mui/material";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { SysAppLayoutContext } from "/imports/ui/layouts/AppLayout";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const HomeSectionNotificacoes : React.FC = () => {
    const sysLayoutContext = useContext(SysAppLayoutContext);

    return (
        <HomeSection
            title='Notificações'
            description='As notificações são mensagens exibidas ao usuário para informar sobre ações realizadas ou necessárias. Elas podem ser personalizadas e possuem diferentes tipos de exibição. Estão acessíveis através do contexto SysAppLayoutContext, que é compartilhado por toda a aplicação. Para usar basta apenas chamar a função showNotification e passar a mensagem desejada.'
            needReview='É preciso adequar o estilo aos padrões definidos no Wireframe.'
        >
            <HomePageRowButtons>
                
                <Button
                    color='secondary'
                    startIcon={<HighlightOffRoundedIcon />}
                    onClick={sysLayoutContext.closeNotification}
                    sx={{mr: '1.5rem'}}
                >
                    Fechar Notificação
                </Button>

                <Button
                    color='primary'
                    startIcon={<NotificationsNoneRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({message: 'Notificação padrão', type: 'info'});
                    }}
                >
                    Notificação padrão
                </Button>

                <Button
                    color='error'
                    startIcon={<ErrorOutlineRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({message: 'Notificação de erro', type: 'error'});
                    }}
                >
                    Notificação de erro
                </Button>

                <Button
                    color='warning'
                    startIcon={<WarningAmberRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({message: 'Notificação de aviso', type: 'warning'});
                    }}
                >
                    Notificação de aviso
                </Button>

                <Button
                    color='success'
                    startIcon={<CheckCircleOutlineRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({message: 'Notificação de sucesso', type: 'success'});
                    }}
                >
                    Notificação de sucesso
                </Button>

            </HomePageRowButtons>
        </HomeSection>
    )
}

export default HomeSectionNotificacoes;