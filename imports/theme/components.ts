/* eslint-disable */
import { Components, Theme } from "@mui/material";
import { sysShadows } from "./shadows";
import { sysSizes } from "./sizes";

const getSysComponentsStyles = (theme: Theme, fontScale: number): Components => ({
	MuiAutocomplete: {
		styleOverrides: {
			root: {
				"&.MuiTextField-root": {
					padding: "0"
				}
			},
			popupIndicator: {
				color: theme.palette.sysText?.body
			},
			endAdornment: {
				top: "unset",
				right: sysSizes.spacingRem.sm
			},
			inputRoot: {
				padding: ".3125rem 0.75rem"
			},
			paper: {
				borderRadius: "8px"
			},
			option: {
				"color": theme.palette.sysText?.body,
				"padding": "0.5rem 1rem !important",
				"&:hover, &.Mui-focused": {
					color: theme.palette.sysText?.primary,
					backgroundColor: `${theme.palette.sysAction?.primaryBgHover} !important`
				}
			}
		}
	},

	MuiButton: {
		defaultProps: {
			variant: "contained",
			size: "medium",
			disableElevation: true
		},
		styleOverrides: {
			root: {
				"borderRadius": sysSizes.radius.sm,
				"margin": 0,
				"textTransform": "none",
				"&:focus": {
					outline: "none"
				}
			},
			contained: {
				"&.Mui-disabled": {
					color: theme.palette.sysAction?.disabled,
					backgroundColor: theme.palette.sysAction?.bgDisabled,
					border: `1px solid ${theme.palette.sysAction?.bgDisabled}`,
					opacity: 1
				}
			},
			containedPrimary: {
				"color": theme.palette.sysAction?.primaryContrastText,
				"backgroundColor": theme.palette.sysAction?.primary,
				"border": `1px solid ${theme.palette.sysAction?.primary}`,
				"&:hover, &:focus": {
					backgroundColor: theme.palette.sysAction?.primaryHover,
					border: `1px solid ${theme.palette.sysAction?.primaryHover}`
				}
			},
			outlined: {
				"&.Mui-disabled": {
					color: theme.palette.sysAction?.disabled,
					backgroundColor: "transparent",
					border: `1px solid ${theme.palette.sysAction?.disabled}`,
					opacity: 1
				}
			},
			outlinedPrimary: {
				"color": theme.palette.sysAction?.primary,
				"backgroundColor": "transparent",
				"border": `1px solid ${theme.palette.sysAction?.primary}`,
				"&:hover, &:focus": {
					color: theme.palette.sysAction?.primaryHover,
					backgroundColor: theme.palette.sysAction?.primaryBgHover,
					border: `1px solid ${theme.palette.sysAction?.primaryHover}`
				}
			},
			text: {
				"&.Mui-disabled": {
					color: theme.palette.sysAction?.disabled,
					backgroundColor: "transparent",
					opacity: 1
				}
			},
			textPrimary: {
				"color": theme.palette.sysAction?.primary,
				"backgroundColor": "transparent",
				"&:hover": {
					color: theme.palette.sysAction?.primaryHover,
					backgroundColor: theme.palette.sysAction?.primaryBgHover
				}
			},
			sizeMedium: {
				padding: `${sysSizes.components.buttonMediumPy} ${sysSizes.components.buttonMediumPx}`,
				minHeight: sysSizes.components.buttonMediumMinHeight,
				lineHeight: `calc(${1.5 * fontScale}rem)`
			},
			sizeSmall: {
				padding: `${sysSizes.components.buttonSmallPy} ${sysSizes.components.buttonSmallPx}`,
				minHeight: sysSizes.components.buttonSmallMinHeight,
				...theme.typography.button2,
				lineHeight: `calc(${1.125 * fontScale}rem)`
			},
			startIcon: {
				margin: 0,
				marginRight: sysSizes.components.buttonGap,
				padding: 0
			},
			endIcon: {
				margin: 0,
				marginLeft: sysSizes.components.buttonGap,
				padding: 0
			},
			iconSizeSmall: {
				"& .MuiSvgIcon-root": {
					fontSize: sysSizes.components.iconSizeSmall
				}
			},
			iconSizeMedium: {
				"& .MuiSvgIcon-root": {
					fontSize: sysSizes.components.iconSize
				}
			}
		}
	},

	MuiCheckbox: {
		styleOverrides: {
			root: {
				"& > .MuiSvgIcon-root": {
					color: theme.palette.sysAction?.auxiliary
				},
				"&:hover": {
					"background": theme.palette.sysAction?.primaryBgHover,
					"& > .MuiSvgIcon-root": {
						color: theme.palette.sysAction?.primary
					}
				},
				"&.Mui-checked": {
					"& > .MuiSvgIcon-root": {
						color: theme.palette.sysAction?.primary
					}
				},
				"&.Mui-disabled": {
					"& > .MuiSvgIcon-root": {
						color: theme.palette.sysAction?.disabled
					}
				}
			}
		}
	},
	MuiFab: {
		defaultProps: {
			variant: "extended",
			size: "medium",
			color: "primary"
		},
		styleOverrides: {
			root: {
				"gap": sysSizes.components.buttonGap,
				"textTransform": "none",
				"boxShadow": sysShadows.shadow6,
				"&.Mui-disabled": {
					color: theme.palette.sysAction?.disabled,
					backgroundColor: theme.palette.sysAction?.bgDisabled,
					boxShadow: sysShadows.shadow6,
					opacity: 1
				}
			},
			primary: {
				"color": theme.palette.sysAction?.primaryContrastText,
				"backgroundColor": theme.palette.sysAction?.primary,
				"transition": "all 150ms linear",
				"&:hover, &:focus": {
					backgroundColor: theme.palette.sysAction?.primaryHover,
					transition: "all 150ms linear"
				},
				"&:active": {
					boxShadow: sysShadows.shadow2,
					transition: "all 150ms linear"
				}
			},
			sizeMedium: {
				padding: `${sysSizes.components.buttonMediumPy} ${sysSizes.components.buttonMediumPx}`,
				minHeight: sysSizes.components.buttonMediumMinHeight,
				lineHeight: `calc(${1.5 * fontScale}rem)`
			},
			sizeSmall: {
				padding: `${sysSizes.components.buttonSmallPy} ${sysSizes.components.buttonSmallPx}`,
				minHeight: sysSizes.components.buttonSmallMinHeight,
				...theme.typography.button2,
				lineHeight: `calc(${1.125 * fontScale}rem)`
			}
		}
	},

	MuiFilledInput: {
		defaultProps: {
			margin: "dense",
			disableUnderline: true
		},
		styleOverrides: {
			root: {
				"padding": `${sysSizes.components.inputPy} ${sysSizes.components.inputPx}`,
				"gap": sysSizes.components.inputGap,
				"backgroundColor": theme.palette.sysBackground?.default,
				"color": theme.palette.sysText?.body,
				"borderRadius": sysSizes.radius.sm,
				"border": `1px solid ${theme.palette.divider}`,
				"transition": "all 150ms linear",
				"& .MuiSvgIcon-root": {
					color: theme.palette.sysAction?.primaryIcon
				},
				"&:hover": {
					backgroundColor: theme.palette.sysBackground?.bg1,
					transition: "all 150ms linear"
				},
				"&.Mui-focused": {
					"backgroundColor": theme.palette.sysBackground?.default,
					"color": theme.palette.sysText?.body,
					"border": `1px solid ${theme.palette.primary.main}`,
					"transition": "all 150ms linear",
					"&:hover": {
						backgroundColor: theme.palette.sysBackground?.bg1,
						transition: "all 150ms linear"
					}
				},
				"&.Mui-disabled": {
					"backgroundColor": theme.palette.sysAction?.bgDisabled,
					"color": theme.palette.sysText?.disabled,
					"& .MuiSvgIcon-root": {
						color: theme.palette.sysText?.disabled
					}
				},
				"&.Mui-error": {
					"backgroundColor": theme.palette.sysBackground?.default,
					"color": theme.palette.sysText?.body,
					"border": `1px solid ${theme.palette.error.main}`,
					"transition": "all 150ms linear",
					"&:hover": {
						backgroundColor: theme.palette.sysBackground?.bg1,
						transition: "all 150ms linear"
					}
				}
			},
			input: {
				"color": theme.palette.sysText?.body,
				"padding": 0,
				"height": sysSizes.components.iconSize,
				"&.Mui-disabled": {
					color: theme.palette.sysText?.disabled,
					WebkitTextFillColor: theme.palette.sysText?.disabled
				},
				"&::placeholder": {
					color: theme.palette.sysText?.disabled,
					opacity: 1
				},
				...theme.typography.body1
			}
		}
	},

	MuiFormControl: {
		styleOverrides: {
			root: {
				borderRadius: "8px",
				margin: 0,
				width: "100%"
			},
			marginNormal: {
				marginTop: 4
			}
		}
	},

	MuiFormHelperText: {
		defaultProps: {
			margin: "dense"
		}
	},

	MuiIconButton: {
		defaultProps: {
			color: "primary"
		},
		styleOverrides: {
			root: {
				"padding": sysSizes.spacingRem.xs,
				"&.Mui-disabled": {
					color: theme.palette.sysAction?.disabled
				}
			},
			colorPrimary: {
				"color": theme.palette.sysAction?.primaryIcon,
				"&:hover": {
					color: theme.palette.sysAction?.primaryIcon,
					backgroundColor: theme.palette.sysAction?.primaryBgHover
				}
			}
		}
	},

	MuiInputAdornment: {
		styleOverrides: {
			root: {
				color: theme.palette.sysAction?.primaryIcon
			},
			filled: {
				margin: "0 !important"
			}
		}
	},

	MuiInputBase: {
		defaultProps: {
			margin: "dense"
		}
	},

	MuiInputLabel: {
		defaultProps: {
			margin: "dense"
		}
	},

	MuiMenu: {
		styleOverrides: {
			paper: {
				borderRadius: sysSizes.radius.md,
				boxShadow: sysShadows.shadow6
			},
			list: {
				padding: `${sysSizes.spacingFixed.md} 0`,
				gap: sysSizes.spacingFixed.md
			}
		}
	},

	MuiMenuItem: {
		styleOverrides: {
			root: {
				"padding": `${sysSizes.spacingRem.sm} ${sysSizes.spacingFixed.lg}`,
				"color": theme.palette.sysText?.body,
				"gap": `${sysSizes.spacingRem.sm}`,
				"width": "100%",
				"transition": "all 150ms linear",
				"&:hover, &:focus, &:focus-visible": {
					backgroundColor: theme.palette.sysBackground?.bg1,
					transition: "all 150ms linear"
				},
				"& .MuiSvgIcon-root": {
					color: theme.palette.sysAction?.primary
				},
				"&.Mui-disabled, &.Mui-disabled .MuiSvgIcon-root": {
					color: theme.palette.sysAction?.disabled,
					opacity: 1
				},

				"&.Mui-selected": {
					backgroundColor: theme.palette.sysAction?.primaryBgHover,
					transition: "all 150ms linear"
				}
			}
		}
	},

	MuiRadio: {
		styleOverrides: {
			root: {
				"& > span > .MuiSvgIcon-root": {
					color: theme.palette.sysAction?.auxiliary
				},
				"&:hover": {
					"background": theme.palette.sysAction?.primaryBgHover,
					"& > span > .MuiSvgIcon-root": {
						color: theme.palette.sysAction?.primary
					}
				},
				"&.Mui-checked": {
					"& > span > .MuiSvgIcon-root": {
						color: theme.palette.sysAction?.primary
					}
				},
				"&.Mui-disabled": {
					"& > span > .MuiSvgIcon-root": {
						color: theme.palette.sysAction?.disabled
					}
				}
			}
		}
	},

	MuiSelect: {
		defaultProps: {
			variant: "filled"
		},
		styleOverrides: {
			root: {
				padding: 0,
				width: "100%"
			},
			select: {
				"width": "100%",
				"padding": `${sysSizes.components.inputPy} ${sysSizes.components.inputPx}`,
				"height": sysSizes.components.iconSize,
				"transition": "all 150ms linear",
				"&:focus": {
					backgroundColor: theme.palette.sysBackground?.bg1,
					transition: "all 150ms linear",
					borderRadius: sysSizes.radius.sm
				},
				...theme.typography.body1
			}
		}
	},

	MuiSlider: {
		defaultProps: {
			color: "primary",
			valueLabelDisplay: "auto"
		},
		styleOverrides: {
			root: {
				"&.Mui-disabled": {
					opacity: 1
				},
				"&.Mui-disabled > .MuiSlider-rail, &.Mui-disabled > .MuiSlider-track, &.Mui-disabled > .MuiSlider-thumb": {
					backgroundColor: theme.palette.sysAction?.disabled
				},
				"&.Mui-disabled > .MuiSlider-track": {
					borderColor: theme.palette.sysAction?.disabled
				}
			},
			thumb: {
				"backgroundColor": theme.palette.sysAction?.primary,
				"&:hover, &:focus": {
					boxShadow: `0 0 0 8px ${theme.palette.sysAction?.primaryBgHover}`
				}
			},
			rail: {
				backgroundColor: theme.palette.sysAction?.primary
			},
			track: {
				backgroundColor: theme.palette.sysAction?.primary,
				borderColor: theme.palette.sysAction?.primary
			},
			valueLabel: {
				backgroundColor: theme.palette.sysAction?.primary,
				color: theme.palette.sysAction?.primaryContrastText
			}
		}
	},

	MuiSwitch: {
		styleOverrides: {
			switchBase: {
				"&:hover": {
					background: theme.palette.sysAction?.primaryBgHover
				},
				"&.Mui-checked:hover": {
					background: theme.palette.sysAction?.primaryBgHover
				},
				"&:not(.Mui-disabled):not(.Mui-checked) > span.MuiSwitch-thumb": {
					backgroundColor: theme.palette.sysAction?.primary
				},
				"&.Mui-checked+.MuiSwitch-track": {
					background: theme.palette.sysAction?.primaryHover,
					opacity: 1
				},
				"&.Mui-disabled+.MuiSwitch-track": {
					background: theme.palette.sysAction?.disabled,
					opacity: 1
				},
				"&.Mui-disabled.Mui-checked > span.MuiSwitch-thumb": {
					backgroundColor: theme.palette.sysAction?.disabled,
					opacity: 1
				},
				"&.Mui-disabled:not(.Mui-checked)+.MuiSwitch-track": {
					background: theme.palette.sysAction?.bgDisabled,
					opacity: 1
				},
				"&.Mui-disabled": {
					color: theme.palette.sysAction?.disabled,
					opacity: 1
				},
				"&.Mui-disabled:not(.Mui-checked)": {
					color: theme.palette.sysAction?.bgDisabled,
					opacity: 1
				}
			},
			track: {
				background: theme.palette.sysBackground?.bg3,
				opacity: 1
			}
		}
	},

	MuiTab: {
		styleOverrides: {
			root: {
				"textColor": theme.palette.sysText?.body,
				"textTransform": "none",
				"padding": `${sysSizes.radius.sm} ${sysSizes.radius.lg}`,
				"minHeight": 0,
				"lineHeight": "normal",
				"transition": "all 150ms linear",
				"&:hover": {
					background: theme.palette.sysAction?.primaryBgHover,
					color: theme.palette.sysAction?.primaryHover,
					transition: "all 150ms linear"
				},
				"&.Mui-selected": {
					color: theme.palette.sysAction?.primaryHover,
					transition: "all 150ms linear"
				},
				"&:disabled": {
					color: theme.palette.sysAction?.disabled
				}
			}
		}
	},

	MuiTabs: {
		styleOverrides: {
			root: {
				minHeight: "unset"
			},
			flexContainer: {
				"position": "relative",
				"&::before": {
					content: '""',
					width: "100%",
					height: "1px",
					backgroundColor: theme.palette.divider,
					position: "absolute",
					bottom: 0,
					left: 0
				}
			},
			flexContainerVertical: {
				"&::before": {
					display: "none"
				}
			},
			indicator: {
				height: "3px"
			},
			scrollButtons: {
				backgroundColor: theme.palette.sysBackground?.default,
				opacity: 1
			}
		}
	},

	MuiTextField: {
		defaultProps: {
			variant: "filled"
		},
		styleOverrides: {
			root: {
				width: "100%"
			}
		}
	},

	MuiToolbar: {
		defaultProps: {
			variant: "dense"
		}
	},

	MuiTooltip: {
		defaultProps: {
			enterDelay: 300
		},
		styleOverrides: {
			tooltip: {
				backgroundColor: theme.palette.sysAction?.auxiliary,
				color: theme.palette.sysText?.base,
				borderRadius: sysSizes.radius.xs,
				padding: `${sysSizes.spacingRem.xs} ${sysSizes.spacingRem.sm}`,
				...theme.typography.caption
			}
		}
	},

	MuiTypography: {
		defaultProps: {
			variantMapping: {
				link: "p",
				button2: "p"
			}
		}
	},

	MuiDialog: {
		styleOverrides: {
			paper: {
				maxWidth: "100%",
				maxHeight: "100%"
			}
		}
	}
});

export default getSysComponentsStyles;
