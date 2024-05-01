import { Theme } from "@mui/material"
import sysSizing from "../sizing/sysSizes"

const getSysComponentsStyles = (theme: Theme) => {
	return {
		components: {
			MuiDataGrid: {
				styleOverrides: {
					root: {
						borderRadius: sysSizing.radiusSm,
						border: `1px solid ${theme.palette.divider}`,
						'& .MuiCircularProgress-root': {
							color: theme.palette.primary.main,
						},
						'& .MuiDataGrid-columnHeader': {
							padding: `${sysSizing.spacingFixedMd} ${sysSizing.spacingFixedLg}`,
							gap: `${sysSizing.spacingFixedXl}`,
							'& .MuiDataGrid-columnSeparator': {
								visibility: 'hidden'
							},
						},
						'& .MuiDataGrid-columnHeaders': {
							borderBottom: `2px solid ${theme.palette.sysAction?.primary}`
						},

						'& .MuiTablePagination-root': {
							color: theme.palette.sysText?.body,
						},
						'& .MuiDataGrid-cell': {
							padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedLg}`,
							gap: `${sysSizing.spacingFixedXl}`,
							textAlign: 'center',

						},
						'& .MuiDataGrid-row': {
							borderBottom: `1px solid ${theme.palette.divider}`,
							'&:hover': {
								backgroundColor: theme.palette.sysAction?.primaryBgHover,
							}
						},
						'& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
							outline: 'none'
						},
						'& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
							outline: 'none'
						},
						'& .MuiDataGrid-actionsCell': {
							'& button': {
								color: theme.palette.sysAction?.primaryIcon, //altera a cor dos icones de ação
							},
							'& .MuiDataGrid-footerContainer': {
								padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedLg}`,
								gap: `${sysSizing.spacingFixedXl}`,
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
					}
				}
			},

			MuiModal: {
				styleOverrides: {
					root: {
						'&.MuiBox-root': {
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
						borderRadius: sysSizing.radiusSm,
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
						'&.MuiButton-root': {
							padding: 0,
						},
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
						padding: `${sysSizing.componentsButtonMediumPy} ${sysSizing.componentsButtonMediumPx}`
					},
					sizeSmall: {
						padding: `${sysSizing.componentsButtonSmallPy} ${sysSizing.componentsButtonSmallPx}`,
						...theme.typography.button2,
					},
					startIcon: {
						margin: 0,
						marginRight: sysSizing.componentsButtonGap,
						padding: 0
					},
					endIcon: {
						margin: 0,
						marginLeft: sysSizing.componentsButtonGap,
						padding: 0
					},
					iconSizeSmall: {
						'& .MuiSvgIcon-root': {
							fontSize: sysSizing.componentsIconSizeSmall
						}
					},
					iconSizeMedium: {
						'& .MuiSvgIcon-root': {
							fontSize: sysSizing.componentsIconSize
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
				styleOverrides: {
					root: {
						color: theme.palette.sysAction?.primaryIcon,
					}
				}

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
						padding: '8px 16px',
						backgroundColor: theme.palette.sysBackground?.default,
						color: theme.palette.sysText?.body,
						borderRadius: '8px',
						border: `1px solid ${theme.palette.divider}`,
						'& .MuiSvgIcon-root': {
							color: theme.palette.sysText?.auxiliary
						},
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
							color: theme.palette.sysText?.disabled,
							'& .MuiSvgIcon-root': {
								color: theme.palette.sysText?.disabled
							},
						},
						'&.Mui-error': {
							backgroundColor: theme.palette.sysBackground?.default,
							color: theme.palette.sysText?.body,
							border: `1px solid ${theme.palette.error.main}`,
							'&:hover': {
								backgroundColor: theme.palette.sysBackground?.bg1
							},
							'& .MuiSvgIcon-root': {
								color: theme.palette.error.dark
							},
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
						},
						'&.Mui-disabled': {
							color: theme.palette.sysAction?.disabled,
						},
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
						marginTop: 0,
					}
				}
			},

			MuiSelect: {
				defaultProps: {},
				styleOverrides: {
					root: {
						width: '100%',
						borderRadius: '8px'
					},
					select: {
						width: '100%',
						padding: '8px 16px'
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
						margin: 0,
						width: '100%'
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
							'& > .MuiSvgIcon-root': {
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
							'& > span > .MuiSvgIcon-root': {
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
					},
					'&:hover': {
						background: theme.palette.sysAction?.primaryHover,
						color: theme.palette.sysAction?.primaryContrastText
					},
					'&:disabled': {
						background: theme.palette.sysAction?.bgDisabled,
						color: theme.palette.sysAction?.disabled,
						border: `1px solid ${theme.palette.sysAction?.bgDisabled}`,

					},
					iconSizeMedium: {
						'& .MuiSvgIcon-root': {
							fontSize: sysSizing.componentsIconSize
						}
					}
				}
			},

			MuiTab: {
				styleOverrides: {
					root: {
						textColor: theme.palette.sysText?.body,
						textTransform: 'none',
						padding: `${sysSizing.radiusSm} ${sysSizing.radiusLg}`,
						'&:hover': {
							background: theme.palette.sysAction?.primaryBgHover,
							color: theme.palette.sysAction?.primaryHover
						},
					},
					'&.Mui-selected': {
						indicatorColor: theme.palette.sysAction?.primary,
						textColor: theme.palette.sysAction?.primaryHover
					},
					'&:disabled': {
						textColor: theme.palette.sysAction?.disabled
					}
				}
			},
			MuiSlider: {
				defaultProps: {
					color: 'primary',
					valueLabelDisplay: 'auto',
				},
				styleOverrides: {
					root: {
						color: theme.palette.sysAction?.primary,
						opacity: 1,
						width: 250,
						'& .MuiSlider-valueLabel': {
							backgroundColor: theme.palette.sysAction?.primaryHover,
						}
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
			},

			MuiTooltip: {
				defaultProps: {
					enterDelay: 300,
				},
				styleOverrides: {
					tooltip: {
						backgroundColor: theme.palette.sysAction?.auxiliary,
						color: theme.palette.sysText?.base,
						borderRadius: sysSizing.radiusXs,
						padding: `${sysSizing.spacingRemXs} ${sysSizing.spacingRemSm}`,

					}
				}
			}
		},
	}
}

export default getSysComponentsStyles;
