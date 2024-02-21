import React, { useContext } from 'react';
import { HomePageContainer, HomePageHeader, HomePageRowButtons } from './HomeStyle';
import { SysAppLayoutContext } from '../../layouts/AppLayout';
import { Box, Button, Typography } from '@mui/material';
import HomeSection from './components/section';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ConfirmDialog from '../../GeneralComponents/SysDialog/custom/confirmDialog/confirmDialog';
import DeleteDialog from '../../GeneralComponents/SysDialog/custom/deleteDialog/deleteDialog';

const Home : React.FC = () => {
    const sysLayoutContext = useContext(SysAppLayoutContext);

    return (
        <HomePageContainer>
            <HomePageHeader>
                <Typography variant='h3'>
                    Página de testes
                </Typography>
                <Typography variant='body1'>
                    Bem vindo ao Boilerplate do Synergia. Essa é uma página dedicada aos testes e exibições de componentes e funcionalidades do nosso sistema.
                    Esperamos que você aproveite e aprenda bastante com ela. Para mais dúvidas consulte nossa documentação oficial pelo storybook.
                </Typography>
            </HomePageHeader>

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
            
            <HomeSection
                title='Dialogs, Modais e Windows'
                description= {<>Os Dialogs, Modais e Windows são janelas modais que aparecem sobre a aplicação para informar, confirmar ou solicitar ações do usuário. Eles podem ser personalizados e possuem diferentes tipos de exibição. Estão acessíveis através do contexto SysAppLayoutContext, que é compartilhado por toda a aplicação. Para usar basta apenas chamar a função showDialog e passar as propriedades desejadas. <br/><br/> Todos os 3 componentes: 
                <ul>
                    <li>Dialog</li>
                    <li>Modal</li>
                    <li>Window</li>
                </ul>

                São na verdade um único componente de dialog com parâmetros diferentes. Caso queira renderizar rotas dentro deles, opte pelos componente Modal ou Window</>}
                needReview='O dialog de confimação e exclusão são exatamente os mesmos, porém com diferentes mensagens. Não é necessário usar dois componentes diferentes para isso.'
            >
                <HomePageRowButtons>
                    <Button
                        color='secondary'
                        startIcon={<HighlightOffRoundedIcon />}
                        onClick={sysLayoutContext.closeDialog}
                    >
                        Fechar Dialog
                    </Button>
                    
                    <Button
                        color='secondary'
                        startIcon={<HighlightOffRoundedIcon />}
                        onClick={sysLayoutContext.closeDialog}
                    >
                        Fechar Modal
                    </Button>
                    
                    <Button
                        color='secondary'
                        startIcon={<HighlightOffRoundedIcon />}
                        onClick={sysLayoutContext.closeDialog}
                        sx={{mr: '1.5rem'}}
                    >
                        Fechar window
                    </Button>
                    
                    <Button 
                        color='primary'
                        startIcon={<ThumbUpAltOutlinedIcon />}
                        onClick={() => {
                            ConfirmDialog({
                                showDialog: sysLayoutContext.showDialog,
                                closeDialog: sysLayoutContext.closeDialog,
                                title: 'Confirmar cadastro',
                                message: 'Tem certeza que deseja confirmar o cadastro dos dados preenchidos?',
                                onConfirm: () => {
                                    sysLayoutContext.showNotification({
                                        message: 'Dados salvos!',
                                    });
                                }
                            });
                        }}
                    >
                        Dialog de confirmação
                    </Button>

                    <Button
                        color='primary'
                        startIcon={<WarningAmberRoundedIcon />}
                        onClick = {() => {
                            DeleteDialog({
                                showDialog: sysLayoutContext.showDialog,
                                closeDialog: sysLayoutContext.closeDialog,
                                title: 'Excluir arquivo',
                                message: 'Tem certeza que deseja excluir o arquivo xx.csv?',
                                onDeleteConfirm: () => {
                                    sysLayoutContext.showNotification({
                                        message: 'Excluído com sucesso!',
                                    });
                                }
                            });
                        }}
                    >
                        Confirmação de deleção
                    </Button>



                </HomePageRowButtons>

            </HomeSection>
            

        </HomePageContainer>
    )
} 

export default Home;



/*const Home = () => {
    const {
        showNotification, 
        showDialog, 
        closeDialog, 
        setDarkThemeMode, 
        closeNotification,
        showDrawer,
        deviceType,
        darkMode, 
        fontScale,
        setFontScale,
    } = React.useContext(SysAppLayoutContext);

    const {user, isLoggedIn} = React.useContext(SysAppContext);
    
    setDarkThemeMode(false);
    
    return(
        <Box sx = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%',
        }}>

            <Box 
                sx={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: 'primary.dark',
                }}
            />
            <Button
                onClick={() => {
                    DeleteDialog({
                        showDialog,
                        closeDialog,
                        title: 'Excluir arquivo',
                        message: 'Tem certeza que deseja excluir o arquivo xx.csv?',
                        onDeleteConfirm: () => {
                            showNotification({
                                message: 'Excluído com sucesso!',
                            });
                        }
                    });
            }}
            >
                Teste de Dialog de exclusão
            </Button>

            <Button
                onClick={() => {
                    ConfirmDialog({
                        showDialog,
                        closeDialog,
                        title: 'Confirmar cadastro',
                        message: 'Tem certeza que deseja confirmar o cadastro dos dados preenchidos?',
                        onConfirm: () => {
                            showNotification({
                                message: 'Dados salvos!',
                            });
                        }
                    });
            }}
            >
                Teste de Dialog de confirmação
            </Button>
            
            <Button onClick={() => {
                ShowNotificationChat({
                    showNotification,
                    closeNotification,
                    userName: 'Usuário',
                    message: 'Mensagem',
                });
            }} >
                Teste de Notificação personalizada
            </Button>
            <Button onClick={() => {
                showDrawer({
                    anchor: 'left',
                });
            }} >
                Teste de Drawer
            </Button>
            <Button startIcon={<Add/>}>Cont-medium</Button>
            <Button disabled={true}>Cont-disabled</Button>
            <Button size={'small'} startIcon={<Add/>}>Cont-small</Button>
            <Button variant={'outlined'}>Out-medium</Button>
            <Button variant={'outlined'} disabled={true}>Out-disabled</Button>
            <Button variant={'outlined'} size={'small'}>Out-small</Button>
            <Button variant={'text'}>Text-medium</Button>
            <Button variant={'text'} disabled={true}>Text-disabled</Button>
            <Button variant={'text'} size={'small'}>Text-small</Button>
            {isLoggedIn.toString()}

            <Fab color={'primary'}>
                <Add sx={{mr: `${sysSizing.componentsButtonGap}`}}/>
                Botão
                <Add sx={{ml: `${sysSizing.componentsButtonGap}`}}/>
            </Fab>
            <Fab disabled={true}>
                <Add sx={{mr: `${sysSizing.componentsButtonGap}`}}/>
                Botão
                <Add sx={{ml: `${sysSizing.componentsButtonGap}`}}/>
            </Fab>

            <Tabs value={0}>
                <Tab label="Active" />
                <Tab label="Default" />
                <Tab label="Disabled" disabled/>
            </Tabs>

            <Switch />
            <Switch disabled/>

            <Slider color='primary' />
            <Slider disabled />

            <Slider
              color='primary'
              step={10}
              marks
              min={10}
              max={100}

            />
            <Slider
              disabled
              step={10}
              marks
              min={10}
              max={100}
            />
            <Slider
              color='primary'
              value={[20,50]}
              step={10}
              marks
              min={10}
              max={100}
            />
            <Slider
              disabled
              color='primary'
              value={[20,50]}
              step={10}
              marks
              min={10}
              max={100}
            />

        </Box>
    )
};

export default Home;
*/