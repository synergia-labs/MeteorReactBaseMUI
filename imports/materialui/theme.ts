import { createTheme, ThemeOptions } from '@mui/material/styles';
import * as appStyles from './styles';
import { ButtonProps } from '@mui/material';

export interface IThemeOptionsBoilerplate extends ThemeOptions {
	palette: ThemeOptions['palette'] & {
		onPrimary: { main: string };
		primaryContainer: string;
		onPrimaryContainer: string;
		primaryOnHover: string;
		onSecondary: string;
		secondaryContainer: string;
		onSecondaryContainer: string;
		secondaryOnHover: string;
		onError: string;
		errorContainer: string;
		onErrorContainer: string;
		onBackground: string;
		buttonOnHover: string;
		primaryGradient: string;
		secondaryGradient: string;
		greenBackground: string;
		activeBackground: string;
		lightHover: string;
		surface: string;
		onSurface: string;
		surfaceVariant: string;
		onSurfaceVariant: string;
		outline: string;
		preto: string;
		cinza10: string;
		cinza20: string;
		cinza30: string;
		cinza40: string;
		cinza50: string;
		cinza60: string;
		cinza70: string;
		cinza80: string;
		cinza90: string;
		cinza95: string;
		cinza98: string;
		aquaVale: string;
		amareloVale: string;
		cerejaVale: string;
		laranjaVale: string;
		azulVale: string;
		cinzaEscuro: string;
		branco: string;
		verdeVale: string;
		verdeEscuro: string;
		aquaClaro: string;
		azulEscuro: string;
		amareloClaro: string;
		cerejaEscuro: string;
		cerejaClaro: string;
		cinzaClaro: string;
		cinzaMedio: string;
	};
	typography: ThemeOptions['typography'] & {
		displayLarge: object;
		displayMedium: object;
		displaySmall: object;
		headlineLarge: object;
		headlineMedium: object;
		headlineSmall: object;
		titleLarge: object;
		titleMedium: object;
		titleSmall: object;
		labelLarge: object;
		labelMedium: object;
		labelSmall: object;
		bodyLarge: object;
		bodyMedium: object;
		bodySmall: object;

		h1: object;
		h2: object;
		h3: object;
		h4: object;
		h5: object;
		h6: object;
		h7: object;
		h8: object;
		h9: object;
		h10: object;
	};
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		displayLarge: true;
		displayMedium: true;
		displaySmall: true;
		headlineLarge: true;
		headlineMedium: true;
		headlineSmall: true;
		titleLarge: true;
		titleMedium: true;
		titleSmall: true;
		labelLarge: true;
		labelMedium: true;
		labelSmall: true;
		bodyLarge: true;
		bodyMedium: true;
		bodySmall: true;
	}
}

const getLightTheme = (props: { fontScale: number; isMobile: boolean }): IThemeOptionsBoilerplate => {
	const { fontScale, isMobile } = props;

	return {
		palette: {
			primary: {
				main: appStyles.primary,
				contrastText: appStyles.onPrimary
			},
			secondary: {
				main: appStyles.secondary,
				contrastText: appStyles.onSecondary
			},
			text: {
				primary: appStyles.cinza20,
				secondary: appStyles.onBackground,
				disabled: appStyles.cinza60
			},
			background: {
				paper: appStyles.background,
				default: appStyles.background
			},
			error: {
				main: appStyles.error,
				contrastText: appStyles.onError,
				light: appStyles.errorContainer
			},
			divider: appStyles.cinza90,
			action: {
				active: appStyles.activeBackground,
				hover: appStyles.primaryOnHover
			},

			//gerais
			onPrimary: { main: appStyles.onPrimary },
			primaryContainer: appStyles.primaryContainer,
			onPrimaryContainer: appStyles.onPrimaryContainer,
			primaryOnHover: appStyles.primaryOnHover,
			onSecondary: appStyles.onSecondary,
			secondaryContainer: appStyles.secondaryContainer,
			onSecondaryContainer: appStyles.onSecondary,
			secondaryOnHover: appStyles.secondaryOnHover,
			onError: appStyles.onError,
			errorContainer: appStyles.errorContainer,
			onErrorContainer: appStyles.onErrorContainer,
			onBackground: appStyles.onBackground,
			buttonOnHover: appStyles.buttonOnHover,
			primaryGradient: appStyles.primaryGradient,
			secondaryGradient: appStyles.secondaryGradient,
			greenBackground: appStyles.greenBackground,
			activeBackground: appStyles.activeBackground,
			lightHover: appStyles.lightHover,
			surface: appStyles.surface,
			onSurface: appStyles.onSurface,
			surfaceVariant: appStyles.surfaceVariant,
			onSurfaceVariant: appStyles.onSurfaceVariant,
			outline: appStyles.outline,

			//cinzas
			preto: appStyles.preto,
			cinza10: appStyles.cinza10,
			cinza20: appStyles.cinza20,
			cinza30: appStyles.cinza30,
			cinza40: appStyles.cinza40,
			cinza50: appStyles.cinza50,
			cinza60: appStyles.cinza60,
			cinza70: appStyles.cinza70,
			cinza80: appStyles.cinza80,
			cinza90: appStyles.cinza90,
			cinza95: appStyles.cinza95,
			cinza98: appStyles.cinza98,

			//primarias
			aquaVale: appStyles.aquaVale,
			amareloVale: appStyles.amareloVale,
			cerejaVale: appStyles.cerejaVale,
			laranjaVale: appStyles.laranjaVale,
			azulVale: appStyles.azulVale,
			cinzaEscuro: appStyles.cinzaEscuro,
			branco: appStyles.branco,
			verdeVale: appStyles.verdeVale,

			//secundarias
			verdeEscuro: appStyles.verdeEscuro,
			aquaClaro: appStyles.aquaClaro,
			azulEscuro: appStyles.azulEscuro,
			amareloClaro: appStyles.amareloClaro,
			cerejaEscuro: appStyles.cerejaEscuro,
			cerejaClaro: appStyles.cerejaClaro,
			cinzaClaro: appStyles.cinzaClaro,
			cinzaMedio: appStyles.cinzaMedio
		},
		typography: {
			fontFamily: appStyles.fontFamily,
			fontSize: 16 * fontScale,
			fontWeightLight: 400,
			fontWeightRegular: 400,
			fontWeightMedium: 600,
			fontWeightBold: 600,
			button: appStyles.labelLarge(fontScale),

			displayLarge: appStyles.displayLarge(fontScale),
			displayMedium: appStyles.displayMedium(fontScale),
			displaySmall: appStyles.displaySmall(fontScale),
			headlineLarge: appStyles.headlineLarge(fontScale),
			headlineMedium: appStyles.headlineMedium(fontScale),
			headlineSmall: appStyles.headlineSmall(fontScale),
			titleLarge: appStyles.titleLarge(fontScale),
			titleMedium: appStyles.titleMedium(fontScale),
			titleSmall: appStyles.titleSmall(fontScale),
			labelLarge: appStyles.labelLarge(fontScale),
			labelMedium: appStyles.labelMedium(fontScale),
			labelSmall: appStyles.labelSmall(fontScale),
			bodyLarge: appStyles.bodyLarge(fontScale),
			bodyMedium: appStyles.bodyMedium(fontScale),
			bodySmall: appStyles.bodySmall(fontScale),

			h1: appStyles.h1(fontScale),
			h2: appStyles.h2(fontScale),
			h3: appStyles.h3(fontScale),
			h4: appStyles.h4(fontScale),
			h5: appStyles.h5(fontScale),
			h6: appStyles.h6(fontScale),
			h7: appStyles.h7(fontScale),
			h8: appStyles.h8(fontScale),
			h9: appStyles.h9(fontScale),
			h10: appStyles.h10(fontScale)
		},

		components: {
			MuiDataGrid: {
				styleOverrides: {
					root: {
						border: '0px',
						color: appStyles.cinza20,
						'& .MuiCircularProgress-root': {
							color: appStyles.primary
						},
						'& .MuiDataGrid-columnHeaders': {
							'& .MuiDataGrid-columnSeparator': {
								visibility: 'hidden'
							},
							borderBottom: `2px solid ${appStyles.verdeVale}`
						},
						'& .MuiDataGrid-cell': {
							padding: '4px',
							borderBottom: `1px solid ${appStyles.cinza90}`
						},
						'& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
							outline: 'none'
						},
						'& .MuiDataGrid-row:hover': {
							backgroundColor: appStyles.primaryOnHover
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
							backgroundColor: appStyles.primaryOnHover,
							'&:hover': {
								backgroundColor: appStyles.primaryOnHover
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
					size: 'medium',
					styleVariant: 'primary'
				} as ButtonProps & { styleVariant: 'primary' | 'secondary' },
				styleOverrides: {
					root: (props: any) => ({
						...(props.styleVariant === 'primary' && {
							backgroundColor: appStyles.primary,
							color: appStyles.onPrimary,
							border: `1px solid ${appStyles.primary}`,
							'&:hover': {
								backgroundColor: appStyles.buttonOnHover,
								border: `1px solid ${appStyles.buttonOnHover}`
							},
							'&:focus': {
								outline: 'none'
							},
							'&.Mui-disabled': {
								color: appStyles.cinza50,
								backgroundColor: appStyles.cinza90,
								border: `1px solid ${appStyles.cinza90}`,
								opacity: 1
							}
						}),
						...(props.styleVariant === 'secondary' && {
							backgroundColor: 'transparent',
							color: appStyles.primary,
							border: `1px solid ${appStyles.primary}`,
							'&:hover': {
								backgroundColor: appStyles.primaryOnHover
							},
							'&:focus': {
								outline: 'none'
							},
							'&.Mui-disabled': {
								color: appStyles.cinza50,
								borderColor: appStyles.cinza80,
								opacity: 1
							}
						}),
						minWidth: 'fit-content',
						borderRadius: '8px',
						padding: '0.625rem 1.25rem',
						textTransform: 'none',
						'&.MuiButton-sizeSmall': {
							padding: '0.375rem 0.75rem',
							minHeight: '38px'
						},
						'&.MuiButton-sizeMedium': {
							padding: '0.625rem 1.25rem',
							minHeight: '46px'
						},
						'&.MuiButton-sizeLarge': {
							padding: '0.875rem 1.75rem',
							minHeight: '54px'
						}
					}),
					iconSizeSmall: {
						'& .MuiSvgIcon-root': {
							fontSize: '24px'
						}
					},
					iconSizeMedium: {
						'& .MuiSvgIcon-root': {
							fontSize: '24px'
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
					color: 'primary',
					size: 'medium'
				},
				styleOverrides: {
					root: {
						borderRadius: '50%',
						padding: '6px'
					},
					colorPrimary: {
						'&:hover': {
							backgroundColor: appStyles.primaryOnHover
						}
					},
					colorOnPrimary: {
						'&:hover': {
							backgroundColor: appStyles.lightHover
						}
					}
				}
			},

			MuiToggleButton: {
				styleOverrides: {
					root: {
						padding: '0.625rem',
						border: `1px solid ${appStyles.cinza80}`,
						color: appStyles.onBackground,
						'&:hover': {
							backgroundColor: appStyles.primaryOnHover,
							color: appStyles.primary
						},
						'&.Mui-selected': {
							color: appStyles.primary,
							backgroundColor: appStyles.activeBackground
						}
					}
				}
			},

			MuiIcon: {
				styleOverrides: {
					root: {
						fontSize: 16 * fontScale
					}
				}
			},

			MuiSvgIcon: {
				styleOverrides: {
					root: {
						fontSize: 24 * fontScale
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
						backgroundColor: appStyles.branco,
						color: appStyles.onBackground,
						borderRadius: '8px',
						border: `1px solid ${appStyles.cinza80}`,
						'&:hover': {
							backgroundColor: appStyles.cinza98
						},
						'&.Mui-focused': {
							backgroundColor: appStyles.branco,
							color: appStyles.onBackground,
							border: `1px solid ${appStyles.primary}`,
							'&:hover': {
								backgroundColor: appStyles.cinza98
							}
						},
						'&.Mui-disabled': {
							backgroundColor: appStyles.cinza90,
							border: `1px solid ${appStyles.cinza90}`,
							color: appStyles.cinza60
						},
						'&.Mui-error': {
							backgroundColor: appStyles.branco,
							color: appStyles.onBackground,
							border: `1px solid ${appStyles.error}`,
							'&:hover': {
								backgroundColor: appStyles.cinza98
							}
						},
						...appStyles.bodyLarge(fontScale)
					},
					input: {
						color: appStyles.onBackground,
						padding: 0,
						height: '1.25rem',
						...appStyles.bodyLarge(fontScale),
						'&.Mui-disabled': {
							color: appStyles.cinza60,
							WebkitTextFillColor: appStyles.cinza60
						},
						'&::placeholder': {
							color: appStyles.cinza60,
							opacity: 1
						}
					}
				}
			},

			MuiInputAdornment: {
				styleOverrides: {
					root: {
						color: appStyles.cinza20
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
						color: appStyles.primary,
						gap: '.5rem',
						...appStyles.labelLarge(fontScale),
						'&:hover': {
							background: appStyles.primaryOnHover
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

			MuiTab: {
				styleOverrides: {
					root: {
						fontFamily: appStyles.fontFamily,
						margin: isMobile ? 0 : 4
					}
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
						minWidth: isMobile ? '90%' : '400px',
						//minHeight: isMobile ? '30%' : '190px',
						maxHeight: isMobile ? '90%' : '90%',
						maxWidth: isMobile ? '90%' : '1200px'
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
						top: isMobile ? 0 : 10,
						right: isMobile ? 0 : 10,
						width: isMobile ? '100%' : 360, //,drawerWidth,
						height: isMobile ? '100%' : 'calc(100% - 85px)',
						boxShadow: '-10px 20px 20px -18px #000000, 12px 0px 20px -18px #000000',
						overflow: 'hidden',
						borderRadius: isMobile ? 0 : 15
					}
				}
			},

			MuiAutocomplete: {
				styleOverrides: {
					root: {
						'&.MuiTextField-root': {
							padding: '0'
						},
						...appStyles.bodyLarge
					},
					popupIndicator: {
						color: appStyles.cinza20
					},
					endAdornment: {
						top: 'unset'
					},
					inputRoot: {
						padding: '.3125rem 0.75rem'
					},
					paper: {
						borderRadius: '8px',
						boxShadow: appStyles.cardShadow
					},
					option: {
						color: appStyles.onBackground,
						padding: '0.5rem 1rem !important',
						'&:hover, &.Mui-focused': {
							color: appStyles.primary,
							backgroundColor: `${appStyles.primaryOnHover} !important`
						},
						...appStyles.bodyLarge(fontScale)
					}
				}
			},

			MuiTypography: {
				defaultProps: {
					color: appStyles.onBackground,
					variantMapping: {
						displayLarge: 'h1',
						displayMedium: 'h2',
						displaySmall: 'h3',
						headlineLarge: 'h4',
						headlineMedium: 'h5',
						headlineSmall: 'h6',
						titleLarge: 'h6',
						titleMedium: 'h6',
						titleSmall: 'h6',
						labelLarge: 'p',
						labelMedium: 'p',
						labelSmall: 'p',
						bodyLarge: 'p',
						bodyMedium: 'p',
						bodySmall: 'p'
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
					color: 'primary'
				},
				styleOverrides: {
					root: {
						color: appStyles.verdeVale
					},
					switchBase: {
						'&:hover': {
							background: appStyles.primaryOnHover
						},
						'&.Mui-checked:hover': {
							background: appStyles.primaryOnHover
						}
					}
				}
			},

			MuiCheckbox: {
				styleOverrides: {
					root: {
						'& > .MuiSvgIcon-root': {
							color: appStyles.cinza80
						},
						'&:hover': {
							background: appStyles.primaryOnHover,
							'& > .MuiSvgIcon-root': {
								color: appStyles.primary
							}
						},
						'&.Mui-checked': {
							'& > .MuiSvgIcon-root': {
								color: appStyles.primary
							}
						}
					}
				}
			},

			MuiRadio: {
				styleOverrides: {
					root: {
						'& > span > .MuiSvgIcon-root': {
							color: appStyles.cinza80
						},
						'&:hover': {
							background: appStyles.primaryOnHover,
							'& > span > .MuiSvgIcon-root': {
								color: appStyles.primary
							}
						},
						'&.Mui-checked': {
							'& > span > .MuiSvgIcon-root': {
								color: appStyles.primary
							}
						}
					}
				}
			}
		}
	};
};

const getDarkTheme = (props: { fontScale: number; isMobile: boolean }): IThemeOptionsBoilerplate => {
	const { fontScale, isMobile } = props;
	return {
		...getLightTheme(props),
		palette: {
			...getLightTheme(props).palette,
			mode: 'dark',
			primary: {
				main: appStyles.darkPalette.primary,
				contrastText: appStyles.darkPalette.onPrimary
			},
			secondary: {
				main: appStyles.darkPalette.secondary,
				contrastText: appStyles.darkPalette.onSecondary
			},
			text: {
				primary: appStyles.darkPalette.cinza20,
				secondary: appStyles.darkPalette.onBackground,
				disabled: appStyles.darkPalette.cinza60
			},
			background: {
				paper: appStyles.darkPalette.background,
				default: appStyles.darkPalette.background
			},
			error: {
				main: appStyles.darkPalette.error,
				contrastText: appStyles.darkPalette.onError,
				light: appStyles.darkPalette.errorContainer
			},
			divider: appStyles.darkPalette.cinza90,
			action: {
				active: appStyles.darkPalette.activeBackground,
				hover: appStyles.darkPalette.primaryOnHover
			},

			//gerais
			onPrimary: { main: appStyles.darkPalette.onPrimary },
			primaryContainer: appStyles.darkPalette.primaryContainer,
			onPrimaryContainer: appStyles.darkPalette.onPrimaryContainer,
			primaryOnHover: appStyles.darkPalette.primaryOnHover,
			onSecondary: appStyles.darkPalette.onSecondary,
			secondaryContainer: appStyles.darkPalette.secondaryContainer,
			onSecondaryContainer: appStyles.darkPalette.onSecondary,
			secondaryOnHover: appStyles.darkPalette.secondaryOnHover,
			onError: appStyles.darkPalette.onError,
			errorContainer: appStyles.darkPalette.errorContainer,
			onErrorContainer: appStyles.darkPalette.onErrorContainer,
			onBackground: appStyles.darkPalette.onBackground,
			buttonOnHover: appStyles.darkPalette.buttonOnHover,
			primaryGradient: appStyles.darkPalette.primaryGradient,
			secondaryGradient: appStyles.darkPalette.secondaryGradient,
			greenBackground: appStyles.darkPalette.greenBackground,
			activeBackground: appStyles.darkPalette.activeBackground,
			lightHover: appStyles.darkPalette.lightHover,
			surface: appStyles.darkPalette.surface,
			onSurface: appStyles.darkPalette.onSurface,
			surfaceVariant: appStyles.darkPalette.surfaceVariant,
			onSurfaceVariant: appStyles.darkPalette.onSurfaceVariant,
			outline: appStyles.darkPalette.outline,

			//cinzas
			preto: appStyles.darkPalette.preto,
			cinza10: appStyles.darkPalette.cinza10,
			cinza20: appStyles.darkPalette.cinza20,
			cinza30: appStyles.darkPalette.cinza30,
			cinza40: appStyles.darkPalette.cinza40,
			cinza50: appStyles.darkPalette.cinza50,
			cinza60: appStyles.darkPalette.cinza60,
			cinza70: appStyles.darkPalette.cinza70,
			cinza80: appStyles.darkPalette.cinza80,
			cinza90: appStyles.darkPalette.cinza90,
			cinza95: appStyles.darkPalette.cinza95,
			cinza98: appStyles.darkPalette.cinza98,

			//primarias
			aquaVale: appStyles.darkPalette.aquaVale,
			amareloVale: appStyles.darkPalette.amareloVale,
			cerejaVale: appStyles.darkPalette.cerejaVale,
			laranjaVale: appStyles.darkPalette.laranjaVale,
			azulVale: appStyles.darkPalette.azulVale,
			cinzaEscuro: appStyles.darkPalette.cinzaEscuro,
			branco: appStyles.darkPalette.branco,
			verdeVale: appStyles.darkPalette.verdeVale,

			//secundarias
			verdeEscuro: appStyles.darkPalette.verdeEscuro,
			aquaClaro: appStyles.darkPalette.aquaClaro,
			azulEscuro: appStyles.darkPalette.azulEscuro,
			amareloClaro: appStyles.darkPalette.amareloClaro,
			cerejaEscuro: appStyles.darkPalette.cerejaEscuro,
			cerejaClaro: appStyles.darkPalette.cerejaClaro,
			cinzaClaro: appStyles.darkPalette.cinzaClaro,
			cinzaMedio: appStyles.darkPalette.cinzaMedio
		}
	};
};

export const getTheme = (options: { fontScale: number; darkMode: boolean; isMobile: boolean }) => {
	const fontScale = options.fontScale || 1;
	const isMobile = options.isMobile || false;

	if (options.darkMode) {
		return createTheme(getDarkTheme({ fontScale, isMobile }));
	} else {
		return createTheme(getLightTheme({ fontScale, isMobile }));
	}
};
