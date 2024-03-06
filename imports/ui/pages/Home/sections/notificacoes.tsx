import React, { useContext } from "react";
import HomeSection from "../components/section";
import { HomePageRowButtons } from "../HomeStyle";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { SysAppLayoutContext } from "/imports/ui/layouts/AppLayout";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

const HomeSectionNotificacoes : React.FC = () => {
    const sysLayoutContext = useContext(SysAppLayoutContext);

    return (
        <HomeSection
            title='Notificações'
            description='As notificações são mensagens exibidas ao usuário para informar sobre ações realizadas ou necessárias. Elas podem ser personalizadas e possuem diferentes tipos de exibição. Estão acessíveis através do contexto SysAppLayoutContext, que é compartilhado por toda a aplicação. Para usar basta apenas chamar a função showNotification e passar a mensagem desejada.'
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
                        sysLayoutContext.showNotification({
                            title: 'Notificação padrão', 
                            message: 'Esta é uma notificação padrão', 
                            type: 'default',
                            showCloseButton: true,
                            actionButtonTex: 'Fechar',
                        });
                    }}
                >
                    Notificação padrão
                </Button>

                <Button
                    color='error'
                    startIcon={<ErrorOutlineRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({
                            title: 'Notificação de erro', 
                            message: 'Teste de notificação de erro',  
                            type: 'error',
                            showCloseButton: true,
                            actionButtonTex: 'Fechar',
                        });
                    }}
                >
                    Notificação de erro
                </Button>

                <Button
                    color='warning'
                    startIcon={<WarningAmberRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({
                            title: 'Notificação de aviso', 
                            message: "Teste de notificação de aviso", 
                            type: 'warning',
                            onClickActionButton: () => { }
                        });
                    }}
                >
                    Notificação de aviso
                </Button>

                <Button
                    color='success'
                    startIcon={<CheckCircleOutlineRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({title: 'Notificação de sucesso', message: 'Teste de notificação de sucesso', type: 'success'});
                    }}
                >
                    Notificação de sucesso
                </Button>

                <Button
                    color = 'info'
                    startIcon={<ChatRoundedIcon />}
                    onClick={() => {
                        sysLayoutContext.showNotification({
                            horizontal: 'right',
                            children: (
                                <Paper sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    padding: '6px 24px'
                                }}>
                                    <Avatar sx={{mr: 2}}>S</Avatar>
                                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                                        <Typography variant="subtitle1" >Synergia</Typography>
                                        <Typography variant="caption" >Olá, seja bem vindo!</Typography>    
                                    </Box>
                                </Paper>
                            )
                        });
                    }}
                >
                    Notificação personalizada
                </Button>

            </HomePageRowButtons>
        </HomeSection>
    )
}

export default HomeSectionNotificacoes;