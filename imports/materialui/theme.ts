import { createTheme } from '@mui/material/styles';
import * as appStyles from '/imports/materialui/styles';
import React from 'react';
import { ButtonProps, Theme } from '@mui/material';

declare module '@mui/material/styles' {
	interface ISysText {
		body?: string;
		title?: string;
		base?: string;
		baseContrast?: string;
		auxiliary?: string;
		primary?: string;
		secondary?: string;
		tertiary?: string;
		disabled?: string;
	}

	interface ISysBackground {
		paper: string;
		default: string;
		bg1: string;
		bg2: string;
		bg3: string;
	}

	interface ISysAction {
		primary: string;
		primaryHover: string;
		primaryBgHover: string;
		primaryContrastText: string;
		primaryIcon: string;
		disabled: string;
		bgDisabled: string;
		auxiliary: string;
		boxShadowFab:string;
	}

	interface Palette {
		tertiary?: Palette['primary'];
		sysText?: ISysText;
		sysBackground?: ISysBackground;
		sysAction?: ISysAction;
	}

	interface PaletteOptions {
		tertiary?: PaletteOptions['primary'];
		sysText?: Partial<ISysText>;
		sysBackground?: Partial<ISysBackground>;
		sysAction?: Partial<ISysAction>;
	}

	interface TypographyVariants {
		link?: React.CSSProperties;
		button2?: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		link?: React.CSSProperties;
		button2?: React.CSSProperties;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		link: true;
		button2: true;
		overline: false;
	}
}

const getLightThemeBase = (props: { fontScale: number }) => {
	const fontScale = props.fontScale;
	return {
		palette: {
			common: {
				black: appStyles.sysBaseColors.black,
				white: appStyles.sysBaseColors.white,
			},
			primary: {
				light: appStyles.sysBaseColors.purple70,
				main: appStyles.sysBaseColors.purple50,
				dark: appStyles.sysBaseColors.purple30,
				contrastText: appStyles.sysBaseColors.white
			},
			secondary: {
				light: appStyles.sysBaseColors.green95,
				main: appStyles.sysBaseColors.green80,
				dark: appStyles.sysBaseColors.green60,
				contrastText: appStyles.sysBaseColors.grey20
			},
			tertiary: {
				light: appStyles.sysBaseColors.neon97,
				main: appStyles.sysBaseColors.neon90,
				dark: appStyles.sysBaseColors.neon60,
				contrastText: appStyles.sysBaseColors.grey20
			},
			success: {
				light: appStyles.sysBaseColors.green95,
				main: appStyles.sysBaseColors.green60,
				dark: appStyles.sysBaseColors.green40,
				contrastText: appStyles.sysBaseColors.white
			},
			warning: {
				light: appStyles.sysBaseColors.yellow90,
				main: appStyles.sysBaseColors.yellow60,
				dark: appStyles.sysBaseColors.yellow30,
				contrastText: appStyles.sysBaseColors.grey10
			},
			info: {
				light: appStyles.sysBaseColors.blue95,
				main: appStyles.sysBaseColors.blue40,
				dark: appStyles.sysBaseColors.blue30,
				contrastText: appStyles.sysBaseColors.white
			},
			error: {
				light: appStyles.sysBaseColors.red95,
				main: appStyles.sysBaseColors.red60,
				dark: appStyles.sysBaseColors.red40,
				contrastText: appStyles.sysBaseColors.white
			},
			text: {
				primary: appStyles.sysBaseColors.grey10,
				secondary: appStyles.sysBaseColors.grey30,
				disabled: appStyles.sysBaseColors.grey70
			},
			sysText: {
				body: appStyles.sysBaseColors.grey30,
				title: appStyles.sysBaseColors.grey10,
				base: appStyles.sysBaseColors.white,
				baseContrast: appStyles.sysBaseColors.black,
				auxiliary: appStyles.sysBaseColors.grey50,
				primary: appStyles.sysBaseColors.purple50,
				secondary: appStyles.sysBaseColors.green80,
				tertiary: appStyles.sysBaseColors.neon90,
				disabled: appStyles.sysBaseColors.grey70
			},
			background: {
				paper: appStyles.sysBaseColors.white,
				default: appStyles.sysBaseColors.white
			},
			sysBackground: {
				paper: appStyles.sysBaseColors.white,
				default: appStyles.sysBaseColors.white,
				bg1: appStyles.sysBaseColors.grey97,
				bg2: appStyles.sysBaseColors.grey95,
				bg3: appStyles.sysBaseColors.grey90,
			},
			divider: appStyles.sysBaseColors.grey80,
			sysAction: {
				primary: appStyles.sysBaseColors.purple50,
				primaryHover: appStyles.sysBaseColors.purple30,
				primaryBgHover: appStyles.sysBaseColors.purpleTransparent,
				primaryContrastText: appStyles.sysBaseColors.white,
				primaryContrastBg: appStyles.sysBaseColors.greyTransparent,
				primaryIcon: appStyles.sysBaseColors.purpleGrey,
				disabled: appStyles.sysBaseColors.grey70,
				bgDisabled: appStyles.sysBaseColors.grey95,
				auxiliary: appStyles.sysBaseColors.grey30,
			}
		},
		typography: {
			fontFamily: "'Poppins', sans-serif",
			h1: appStyles.h1(fontScale),
			h2: appStyles.h2(fontScale),
			h3: appStyles.h3(fontScale),
			h4: appStyles.h4(fontScale),
			h5: appStyles.h5(fontScale),
			h6: appStyles.h6(fontScale),
			subtitle1: appStyles.sutitle1(fontScale),
			subtitle2: appStyles.subtitle2(fontScale),
			button: appStyles.button(fontScale),
			button2: appStyles.button2(fontScale),
			link: appStyles.link(fontScale),
			body1: appStyles.body1(fontScale),
			body2: appStyles.body2(fontScale),
			caption: appStyles.caption(fontScale)
		},
	}
}

const getConfiguration = (theme: Theme, fontScale: number) => {
	return {
		components: {
			MuiDataGrid: {
				styleOverrides: {
					root: {
						border: '0px',
						color: theme.palette.sysText?.body,
						'& .MuiCircularProgress-root': {
							color: theme.palette.primary.main,
						},
						'& .MuiDataGrid-columnHeaders': {
							'& .MuiDataGrid-columnSeparator': {
								visibility: 'hidden'
							},
							borderBottom: `2px solid ${theme.palette.primary.dark}`
						},
						'& .MuiDataGrid-cell': {
							padding: '4px',
							borderBottom: `1px solid ${theme.palette.divider}`
						},
						'& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
							outline: 'none'
						},
						'& .MuiDataGrid-row:hover': {
							backgroundColor: theme.palette.sysAction?.primaryBgHover
						},
						'& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
							outline: 'none'
						},
						'& .MuiDataGrid-actionsCell': {
							gap: '0px',
							'& button': {
								color: 'black'
							}
						}
					},
					row: {
						cursor: 'pointer',
						'&.Mui-selected': {
							backgroundColor: theme.palette.sysAction?.primaryBgHover,
							'&:hover': {
								backgroundColor: theme.palette.sysAction?.primaryBgHover
							}
						}
					}
				}
			},

			MuiBox: {
				styleOverrides: {
					root: {
						maxHeight: '100vh'
					}
				}
			},

			MuiModal: {
				styleOverrides: {
					root: {
						'&.MuiBox-root': {
							maxHeight: '100vh'
						}
					}
				}
			},

			MuiButton: {
				defaultProps: {
					variant: 'contained',
					size: 'medium',
					disableElevation: true,
				},
				styleOverrides: {
					root: {
						borderRadius: appStyles.sysSizing.radiusSm,
						margin: 0,
						textTransform: 'none',
						'&:focus': {
							outline: 'none'
						},
					},
					contained: {
						'&.Mui-disabled': {
							color: theme.palette.sysAction?.disabled,
							backgroundColor: theme.palette.sysAction?.bgDisabled,
							border: `1px solid ${theme.palette.sysAction?.bgDisabled}`,
							opacity: 1
						}
					},
					containedPrimary: {
						backgroundColor: theme.palette.sysAction?.primary,
						color: theme.palette.sysAction?.primaryContrastText,
						border: `1px solid ${theme.palette.sysAction?.primary}`,
						'&:hover': {
							backgroundColor: theme.palette.sysAction?.primaryHover,
							border: `1px solid ${theme.palette.sysAction?.primaryHover}`
						}
					},
					outlined: {
						'&.Mui-disabled': {
							color: theme.palette.sysAction?.disabled,
							backgroundColor: 'transparent',
							border: `1px solid ${theme.palette.sysAction?.disabled}`,
							opacity: 1
						}
					},
					outlinedPrimary: {
						backgroundColor: 'transparent',
						color: theme.palette.sysAction?.primary,
						border: `1px solid ${theme.palette.sysAction?.primary}`,
						'&:hover': {
							backgroundColor: theme.palette.sysAction?.primaryBgHover,
							color: theme.palette.sysAction?.primaryHover,
							border: `1px solid ${theme.palette.sysAction?.primaryHover}`
						}
					},
					text: {
						'&.Mui-disabled': {
							color: theme.palette.sysAction?.disabled,
							backgroundColor: 'transparent',
							opacity: 1
						}
					},
					textPrimary: {
						backgroundColor: 'transparent',
						color: theme.palette.sysAction?.primary,
						'&:hover': {
							color: theme.palette.sysAction?.primaryHover,
							backgroundColor: theme.palette.sysAction?.primaryBgHover,
						}
					},
					sizeMedium: {
						padding: `${appStyles.sysSizing.componentsButtonMediumPy} ${appStyles.sysSizing.componentsButtonMediumPx}`
					},
					sizeSmall: {
						padding: `${appStyles.sysSizing.componentsButtonSmallPy} ${appStyles.sysSizing.componentsButtonSmallPx}`,
						...appStyles.button2(fontScale),
					},
					startIcon: {
						margin: 0,
						marginRight: appStyles.sysSizing.componentsButtonGap,
						padding: 0
					},
					endIcon: {
						margin: 0,
						marginLeft: appStyles.sysSizing.componentsButtonGap,
						padding: 0
					},
					iconSizeSmall: {
						'& .MuiSvgIcon-root': {
							fontSize: appStyles.sysSizing.componentsIconSizeSmall
						}
					},
					iconSizeMedium: {
						'& .MuiSvgIcon-root': {
							fontSize: appStyles.sysSizing.componentsIconSize
						}
					}
				}
			},

			MuiFormHelperText: {
				defaultProps: {
					margin: 'dense'
				}
			},

			MuiIconButton: {
				defaultProps: {
					color: theme.palette.sysAction?.primaryIcon,
					size: 'medium'
				},
			},

			MuiToggleButton: {
				styleOverrides: {
					root: {
						padding: '0.625rem',
						border: `1px solid ${theme.palette.divider}`,
						color: theme.palette.sysText?.body,
						'&:hover': {
							backgroundColor: theme.palette.sysAction?.primaryHover,
							color: theme.palette.primary.main
						},
						'&.Mui-selected': {
							color: theme.palette.primary.main,
							backgroundColor: theme.palette.sysAction?.primaryBgHover
						}
					}
				}
			},

			MuiSnackbarContent: {
				styleOverrides: {
					root: { padding: 0 },
					message: { padding: 0 }
				}
			},

			MuiInputBase: {
				defaultProps: {
					margin: 'dense'
				}
			},

			MuiInputLabel: {
				defaultProps: {
					margin: 'dense'
				}
			},

			MuiFilledInput: {
				defaultProps: {
					margin: 'dense',
					disableUnderline: true
				},
				styleOverrides: {
					root: {
						padding: '0.75rem 1rem',
						backgroundColor: theme.palette.sysBackground?.default,
						color: theme.palette.sysText?.body,
						borderRadius: '8px',
						border: `1px solid ${theme.palette.divider}`,
						'&:hover': {
							backgroundColor: theme.palette.sysBackground?.bg1
						},
						'&.Mui-focused': {
							backgroundColor: theme.palette.sysBackground?.default,
							color: theme.palette.sysText?.body,
							border: `1px solid ${theme.palette.primary.main}`,
							'&:hover': {
								backgroundColor: theme.palette.sysBackground?.bg1
							}
						},
						'&.Mui-disabled': {
							backgroundColor: theme.palette.sysAction?.bgDisabled,
							border: `1px solid ${theme.palette.sysBackground?.bg2}`,
							color: theme.palette.sysText?.disabled
						},
						'&.Mui-error': {
							backgroundColor: theme.palette.sysBackground?.default,
							color: theme.palette.sysText?.body,
							border: `1px solid ${theme.palette.error.main}`,
							'&:hover': {
								backgroundColor: theme.palette.sysBackground?.bg1
							}
						},
					},
					input: {
						color: theme.palette.sysText?.body,
						padding: 0,
						height: '1.25rem',
						'&.Mui-disabled': {
							color: theme.palette.sysText?.disabled,
							WebkitTextFillColor: theme.palette.sysText?.disabled
						},
						'&::placeholder': {
							color: theme.palette.sysText?.disabled,
							opacity: 1
						}
					}
				}
			},

			MuiInputAdornment: {
				styleOverrides: {
					root: {
						color: theme.palette.sysText?.body
					},
					filled: {
						marginTop: '0 !important'
					}
				}
			},

			MuiMenuItem: {
				styleOverrides: {
					root: {
						padding: '0.5rem 1.5rem',
						color: theme.palette.sysAction?.primary,
						gap: '.5rem',
						'&:hover': {
							background: theme.palette.sysAction?.primaryBgHover
						}
					}
				}
			},

			MuiListItem: {
				defaultProps: {
					dense: true
				}
			},

			MuiTextField: {
				defaultProps: {
					margin: 'normal',
					variant: 'filled'
				},
				styleOverrides: {
					root: {
						width: '100%',
						marginTop: 0
					}
				}
			},

			MuiToolbar: {
				defaultProps: {
					variant: 'dense'
				}
			},

			MuiFormControl: {
				styleOverrides: {
					root: {
						borderRadius: '8px',
						margin: 0
					},
					marginNormal: {
						marginTop: 4
					}
				}
			},

			MuiDialog: {
				styleOverrides: {
					paper: {
					}
				}
			},

			MuiDrawer: {
				styleOverrides: {
					root: {
						width: 360, // drawerWidth,
						flexShrink: 0
					},
					paper: {
						top: 10,
						right: 10,
						width: 360, //,drawerWidth,
						height: 'calc(100% - 85px)',
						boxShadow: '-10px 20px 20px -18px #000000, 12px 0px 20px -18px #000000',
						overflow: 'hidden',
						borderRadius: 15
					}
				}
			},

			MuiAutocomplete: {
				styleOverrides: {
					root: {
						'&.MuiTextField-root': {
							padding: '0'
						},
					},
					popupIndicator: {
						color: theme.palette.sysText?.body
					},
					endAdornment: {
						top: 'unset'
					},
					inputRoot: {
						padding: '.3125rem 0.75rem'
					},
					paper: {
						borderRadius: '8px',
					},
					option: {
						color: theme.palette.sysText?.body,
						padding: '0.5rem 1rem !important',
						'&:hover, &.Mui-focused': {
							color: theme.palette.sysText?.primary,
							backgroundColor: `${theme.palette.sysAction?.primaryBgHover} !important`
						},
					}
				}
			},

			MuiTypography: {
				defaultProps: {
					variantMapping: {
						link: 'p',
						button2: 'p'
					}
				}
			},

			MuiTooltip: {
				defaultProps: {
					enterDelay: 300
				},
				styleOverrides: {
					tooltip: {
						fontWeight: 'normal'
					}
				}
			},

			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: 'white',
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1);'
					}
				}
			},

			MuiSwitch: {
				defaultProps: {
					color: 'primary',
				},
				styleOverrides: {
					root: {
						color: theme.palette.sysText?.body,
					},
					switchBase: {
						'&:hover': {
							background: theme.palette.sysAction?.primaryBgHover
						},
						'&.Mui-checked:hover': {
							background: theme.palette.sysAction?.primaryBgHover
						},
						'&.Mui-checked': {
							color: theme.palette.sysAction?.primary
						},
						'&.Mui-checked+.MuiSwitch-track': {
							background: theme.palette.sysAction?.primaryHover,
							opacity: 1
						},
						'&.Mui-disabled+.MuiSwitch-track': {
							background: theme.palette.sysAction?.bgDisabled,
							opacity: 1
						},
						'&.Mui-disabled': {
							color: theme.palette.sysAction?.bgDisabled,
							opacity: 1
						},
					},
					track: {
						background: theme.palette.sysBackground?.bg3,
						opacity: 1,
					}
				}
			},

			MuiCheckbox: {
				styleOverrides: {
					root: {
						'& > .MuiSvgIcon-root': {
							color: theme.palette.sysText?.body
						},
						'&:hover': {
							'& > .MuiSvgIcon-root': {
								color: theme.palette.sysText?.primary
							}
						},
						'&.Mui-checked': {
							'& > .MuiSvgIcon-root': {
								color: theme.palette.sysText?.primary
							}
						},
						'&.Mui-disabled': {
							'& > .MuiSvgIcon-root':{
								color: theme.palette.sysAction?.disabled
							}
						}
					}
				}
			},

			MuiRadio: {
				styleOverrides: {
					root: {
						'& > span > .MuiSvgIcon-root': {
							color: theme.palette.sysText?.body
						},
						'&:hover': {
							background: theme.palette.sysAction?.primaryBgHover,
							'& > span > .MuiSvgIcon-root': {
								color: theme.palette.sysText?.primary
							}
						},
						'&.Mui-checked': {
							'& > span > .MuiSvgIcon-root': {
								color: theme.palette.sysText?.primary
							}
						},
						'&.Mui-disabled': {
							'& > span > .MuiSvgIcon-root':{
								color: theme.palette.sysAction?.disabled
							}
						}
					}
				}
			},

			MuiAlert: {
				styleOverrides: {
					root: {
						borderRadius: '8px',
						minWidth: '300px'
					}
				}
			},

			MuiFab: {
				defaultProps: {
					variant: 'extended',
					size: 'medium'
				},
				styleOverrides: {
					root: {
						background: theme.palette.sysAction?.primary,
						color: theme.palette.sysAction?.primaryContrastText,
					},
					'MuiFab-primary': {
						border: `1px solid ${theme.palette.sysAction?.primary}`,
						boxShadow: appStyles.boxShadowFab,
					},
					'&:hover': {
						background: theme.palette.sysAction?.primaryHover,
						color: theme.palette.sysAction?.primaryContrastText
					},
					'&:disabled': {
						background: theme.palette.sysAction?.bgDisabled,
						color: theme.palette.sysAction?.disabled,
						border: `1px solid ${theme.palette.sysAction?.bgDisabled}`,
						boxShadow: appStyles.boxShadowFab,

					},
					iconSizeMedium: {
						'& .MuiSvgIcon-root': {
							fontSize: appStyles.sysSizing.componentsIconSize
						}
					}
				}
			},

			MuiTab: {
				styleOverrides:{
					root:{
						textColor: theme.palette.sysText?.body,
						textTransform: 'none',
						padding: `${appStyles.sysSizing.radiusSm} ${appStyles.sysSizing.radiusLg}`,
						'&:hover': {
							background: theme.palette.sysAction?.primaryBgHover,
							color: theme.palette.sysAction?.primaryHover
						},
					},
					'&.Mui-selected':{
						indicatorColor: theme.palette.sysAction?.primary,
						textColor: theme.palette.sysAction?.primaryHover
					},
					'&:disabled':{
						textColor: theme.palette.sysAction?.disabled
					}
				}
			},
			MuiSlider: {
				defaultProps: {
					color: 'primary',
					valueLabelDisplay: 'auto',
					ariaLabel:'Default'
				},
				styleOverrides:{
					root:{
						color: theme.palette.sysAction?.primary,
						opacity: 1,
						width: 250,
					},
					'&.Mui-Slider-thumb': {
						background: theme.palette.sysAction?.primary,
						opacity: 0.38
					},
					'&.MuiSlider-rail': {
						background: theme.palette.sysAction?.primary,
						opacity: 1
					}
				}
			}
		}
	}
}

export const getTheme = (options: { fontScale: number; darkMode: boolean }) => {
	const fontScale = options.fontScale || 1;

	let theme = createTheme(getLightThemeBase({ fontScale }));

	if (options.darkMode) {
		theme = createTheme(getLightThemeBase({ fontScale }));
	}

	return createTheme(theme, getConfiguration(theme, fontScale));
};