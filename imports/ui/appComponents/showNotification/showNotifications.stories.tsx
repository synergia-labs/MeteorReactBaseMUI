import React from 'react';
import { ShowNotification } from './showNotification';
import { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SysIcon from '../../components/sysIcon/sysIcon';

const meta = {
	title: 'ui/appComponents/ShowNotification',
	component: ShowNotification,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ height: '150px' }}>
				<Story />
			</div>
		)
	],
	args: {
		open: false,
		close: () => {},
		onOpen: () => {},
		onClose: () => {},
		duration: undefined
	},
	argTypes: {
		type: {
			control: {
				type: 'select',
				options: ['success', 'error', 'info', 'warning']
			}
		},
		icon: {
			control: {
				type: 'none'
			}
		},
		action: {
			control: {
				type: 'none'
			}
		},
		children: {
			control: {
				type: 'none'
			}
		}
	}
} satisfies Meta<typeof ShowNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sucesso: Story = {
	args: {
		open: true,
		type: 'success',
		title: 'Sucesso',
		message: `Sua operação foi realizada com sucesso!`
	},
	parameters: {
		docs: {
			description: {
				story: `Esta história ilustra uma notificação de sucesso. É útil para confirmar que uma ação, como uma operação de salvamento ou envio de dados, foi concluída com êxito.`
			}
		}
	}
};

export const Erro: Story = {
	args: {
		open: true,
		type: 'error',
		title: 'Erro',
		message: `Ocorreu um erro inesperado.`
	},
	parameters: {
		docs: {
			description: {
				story: `Esta história apresenta uma notificação de erro. É ideal para alertar os usuários sobre falhas em processos ou problemas que necessitam de atenção imediata.`
			}
		}
	}
};

export const Aviso: Story = {
	args: {
		open: true,
		type: 'warning',
		title: 'Aviso',
		message: `É necessário preencher todos os campos obrigatórios.`
	},
	parameters: {
		docs: {
			description: {
				story: `Esta história exibe uma notificação de aviso. É útil para alertar os usuários sobre ações que precisam de atenção, como a necessidade de completar campos obrigatórios em um formulário.`
			}
		}
	}
};

export const Customizado: Story = {
	args: {
		open: true,
		title: 'Seu download está pronto!',
		sxMap: {
			container: {
				background: '#000000',
				color: '#fff'
			}
		},
		icon: <SysIcon name={'download'} />
	},
	parameters: {
		docs: {
			description: {
				story: `Esta história demonstra uma notificação personalizada. Permite aos desenvolvedores criar um alerta com estilo e funcionalidades específicas, como uma notificação de download concluído com ícone personalizado e esquema de cores diferenciado.
                **É recomendado utilizar as cores definidas no tema.**
                `
			}
		}
	}
};

export const ComChildren: Story = {
	argTypes: {
		title: { table: { disable: true } },
		message: { table: { disable: true } },
		showCloseButton: { table: { disable: true } },
		type: { table: { disable: true } },
		action: { table: { disable: true } },
		icon: { table: { disable: true } },
		sxMap: { table: { disable: true } }
	},
	args: {
		open: true,
		type: 'success',
		title: 'Sucesso',
		message: `Sua operação foi realizada com sucesso!`,
		children: (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderRadius: '8px',
					border: '1px solid #ccc',
					padding: '6px 24px'
				}}>
				<Avatar sx={{ mr: 2 }}>S</Avatar>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="subtitle1">Synergia</Typography>
					<Typography variant="body2">Olá</Typography>
				</Box>
			</Box>
		)
	},
	parameters: {
		docs: {
			description: {
				story: `Importante: Ao utilizar a propriedade 'children' na notificação, as funções de fechamento não são buscadas automaticamente e devem ser pegas manualmente através do contexto.`
			}
		}
	}
};
