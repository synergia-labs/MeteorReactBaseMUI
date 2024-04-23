import React, { useRef } from 'react';
import omit from 'lodash/omit';
import { hasValue } from '/imports/libs/hasValue';

import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { isMobile } from '/imports/libs/deviceVerify';
import { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import * as appStyle from '/imports/ui/materialui/styles';
import { Typography } from '@mui/material';

interface IOption {
	value: any;
	label: string;
	description?: string;
}

interface IOtherProps {
	options?: IOption[];
	defaultValue?: string;
	description?: string;
	menuNone?: boolean;
	menuNotSelected?: boolean;

	[otherPropsKey: string]: any;
}

export const SelectManyField = ({
	name,
	label,
	value,
	description,
	menuNone = false,
	menuNotSelected = false,
	onChange,
	readOnly,
	error,
	help,
	style,
	defaultValue,
	placeholder,
	...otherProps
}: IBaseSimpleFormComponent & IOtherProps) => {
	const [flagAllOptions, setFlagAllOptions] = React.useState(false);

	const { schema } = otherProps;
	const options = otherProps.options || (schema && schema.options ? schema.options : []);
	const multiple = otherProps.multiple || (schema && schema.multiple === true);
	const renderValue = otherProps.renderValue;
	const refValue = useRef(value);

	if (!multiple) {
		return (
			<Box
				key={name}
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					...(otherProps.style || {}),
					...appStyle.fieldContainer
				}}>
				{label ? <SimpleLabelView label={label} /> : null}
				<Box
					id={name}
					key={name}
					style={{
						color: '#222',
						padding: 5,
						height: 35,
						marginTop: 4,
						marginBottom: 8
					}}>
					{' Componente usado para seleção múltipla.(multiple: true)'}
				</Box>
			</Box>
		);
	}

	const onChangeSelect = (event: SelectChangeEvent) => {
		if (!readOnly) {
			onChange &&
				onChange(
					//@ts-ignore
					{ name, target: { name, value: event.target.value } },
					{ name, value: event.target.value }
				);
		}
	};

	const defaultRenderValue = (values: string[] | undefined) => {
		const apenasUmValor = values?.length === 1;
		const maisDeUmValor = values && values.length > 1;
		return (
			<Box style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
				{apenasUmValor && <span>{getLabelFromValue(value)}</span>}
				{maisDeUmValor && <span>{`${getLabelFromValue(value[0])} + ${values.length - 1}`}</span>}
			</Box>
		);
	};

	const getLabelFromValue = (value: string) => {
		const objValue = otherProps.options
			? otherProps.options.find((object) => object.value === value || object === value)
			: schema.options.find((object: any) => object.value === value || object === value);
		return (objValue && (objValue.label || objValue.value)) || value;
	};

	const handleChangeFlagAllOptions = () => {
		setFlagAllOptions((flag) => !flag);
	};

	React.useEffect(() => {
		if (!readOnly) {
			if (flagAllOptions) {
				const values = (options || []).map((opt: any) => opt.value);
				onChange &&
					onChange(
						//@ts-ignore
						{ name, target: { name, value: values } },
						{ name, value: values }
					);
			}

			if (!flagAllOptions && !value) {
				const values = undefined;
				onChange &&
					onChange(
						//@ts-ignore
						{ name, target: { name, value: values } },
						{ name, value: values }
					);
			}
			if (!flagAllOptions && value && value.length === options?.length) {
				const values = undefined;
				onChange &&
					onChange(
						//@ts-ignore
						{ name, target: { name, value: values } },
						{ name, value: values }
					);
			}
		}
	}, [flagAllOptions, readOnly, refValue]);

	React.useEffect(() => {
		if (!readOnly) {
			if (value && value.length === options?.length) {
				setFlagAllOptions(true);
			}
			if (value && value.length < options?.length) {
				setFlagAllOptions(false);
			}
		}
	}, [value, options, readOnly]);

	if (readOnly) {
		if (multiple) {
			if (!value || value.length === 0) return <span>'-'</span>;
			return (
				<Box
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						...appStyle.fieldContainer
					}}
					key={name}>
					{label ? <SimpleLabelView label={label} help={help} /> : null}
					<Box
						id={name}
						key={name}
						style={{
							display: 'flex',
							flexDirection: 'row',
							color: '#222',
							padding: 5,
							marginTop: 4,
							marginBottom: 8,
							width: '100%',
							flexWrap: 'wrap',
							gap: '.3rem'
						}}>
						{value === '-'
							? '-'
							: value.map((val: unknown, index: number) => {
									const objValue = options
										? options.find((object: any) => object?.value === val || object === val)
										: hasValue(val) && val;
									return (
										<Chip
											key={'chip' + val + index}
											variant="outlined"
											label={objValue && objValue.label ? objValue.label : objValue}
											color={'primary'}
										/>
									);
								})}
					</Box>
				</Box>
			);
		}
	}

	return (
		<Box
			sx={{
				...appStyle.fieldContainer,
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				...(otherProps.style || {})
			}}>
			{label && !otherProps.rounded ? <SimpleLabelView label={label} help={help} /> : null}
			{label && !!otherProps.rounded ? (
				<InputLabel style={{ backgroundColor: 'white', marginLeft: 4 }}>{label}</InputLabel>
			) : null}

			<Select
				displayEmpty
				labelId={`${label}${name}`}
				key={name + 'key'}
				id={name}
				placeholder={placeholder}
				style={{
					...(style
						? style
						: {
								//borderColor: '#f2f2f2',
								marginTop: 4
							}),
					...{
						//border: error ? '1px solid #ff0000' : 'undefined',
						borderRadius: error ? '4px' : undefined
					}
					//paddingLeft: 15,
				}}
				value={hasValue(value) ? value : []}
				onChange={onChangeSelect}
				disabled={!!readOnly}
				//input={<InputBase />}
				multiple
				renderValue={(selected: string | string[]) => {
					if (selected.length === 0) {
						return (
							<Typography
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									color: appStyle.cinzaClaro
								}}>
								{placeholder}
							</Typography>
						);
					}

					return multiple ? renderValue || defaultRenderValue(selected) : undefined;
				}}
				{...omit(otherProps, ['options'])}>
				{options?.length > 0 && (
					<Box>
						<MenuItem id={'all'} key={'all'} value={'all'} onClick={handleChangeFlagAllOptions}>
							<Checkbox checked={flagAllOptions} />
							<ListItemText primary={'Todos'} />
						</MenuItem>
						<Divider />
					</Box>
				)}

				{(options || []).map((opt: IOption, index: number) => {
					return (
						<MenuItem
							id={hasValue(opt.value) ? opt.value : opt}
							key={hasValue(opt.value) ? opt.value + '' : 'MenuItemkey' + index}
							value={hasValue(opt.value) ? opt.value : opt}>
							<Checkbox checked={(hasValue(value) && value.includes(opt.value || opt)) || flagAllOptions} />

							<ListItemText
								primary={opt.label ? opt.label : opt}
								secondary={opt.description ? opt.description : ''}
								style={{
									width: style?.listItemWidth ? style.listItemWidth : 'unset',
									whiteSpace: isMobile ? 'normal' : 'unset'
								}}
							/>
						</MenuItem>
					);
				})}

				{options?.length === 0 && (
					<MenuItem id={'NoValues'} disabled value="">
						<ListItemText primary="Nenhuma opção para selecionar" />
					</MenuItem>
				)}
			</Select>
		</Box>
	);
};
