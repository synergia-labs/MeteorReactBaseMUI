import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import { hasValue } from '/imports/libs/hasValue';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import * as appStyle from '/imports/ui/materialui/styles';
import omit from 'lodash/omit';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { isMobile } from '/imports/libs/deviceVerify';
import { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';

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

export default ({
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
	const { schema } = otherProps;
	const options = otherProps.options || (schema && schema.options ? schema.options : []);
	const multiple = otherProps.multiple || (schema && schema.multiple === true);
	const renderValue = otherProps.renderValue;

	if (readOnly) {
		if (multiple) {
			if (!value || value.length === 0) return <span>'-'</span>;
			return (
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						...appStyle.fieldContainer
					}}
					key={name}>
					{label ? <SimpleLabelView label={label} help={help} disabled={readOnly} /> : null}
					<div
						id={name}
						key={name}
						style={{
							display: 'flex',
							flexDirection: 'row',
							color: '#222',
							padding: 5,
							height: 35,
							marginTop: 4,
							marginBottom: 8
						}}>
						{value === '-'
							? '-'
							: value.map((val, index) => {
									const objValue = options
										? options.find((object) => object.value === val || object === val)
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
					</div>
				</div>
			);
		}
		let objValue = options
			? options.find((object) => object.value === value || object === value)
			: hasValue(value) && value;
		if (multiple) {
			objValue = hasValue(value) && renderValue ? renderValue(value) : undefined;

			return (
				<div
					key={name}
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						...(otherProps.style || {}),
						...appStyle.fieldContainer
					}}>
					{label ? <SimpleLabelView label={label} disabled={readOnly} /> : null}
					<div
						id={name}
						key={name}
						style={{
							color: '#222',
							padding: 5,
							height: 35,
							marginTop: 4,
							marginBottom: 8
						}}>
						{value.length > 0 ? objValue : 'Nenhum valor selecionado!'}
					</div>
				</div>
			);
		}

		return (
			<div
				key={name}
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					...appStyle.fieldContainer
				}}>
				{label && !otherProps.rounded ? <SimpleLabelView label={label} help={help} disabled={readOnly} /> : null}
				<SimpleLabelView
					id={name}
					key={name}
					disabled={readOnly}
					value={value === '-' ? '-' : objValue && objValue.label ? objValue.label : objValue}
				/>
			</div>
		);
	}

	const onChangeSelect = (event) => {
		if (event.target.value === '#-#') {
			onChange({ name, target: { name, value: undefined } }, { name, value: undefined });
			return;
		}
		if (!readOnly) {
			onChange({ name, target: { name, value: event.target.value } }, { name, value: event.target.value });
		}
	};

	const getLabelFromValue = (value) => {
		const objValue = otherProps.options
			? otherProps.options.find((object) => object.value === value || object === value)
			: schema.options.find((object) => object.value === value || object === value);
		return (objValue && (objValue.label || objValue.value)) || value;
	};

	const defaultRenderValue = (values) => {
		if (multiple) {
			return (
				<div>
					{values.map((value) => (
						<Chip key={value} label={getLabelFromValue(value)} />
					))}
				</div>
			);
		}
		return <span>{getLabelFromValue(value)}</span>;
	};

	return (
		<div
			key={name}
			style={{
				...appStyle.fieldContainer,
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				...(otherProps.style || {})
			}}>
			{label && !otherProps.rounded ? <SimpleLabelView label={label} help={help} disabled={readOnly} /> : null}
			{label && !!otherProps.rounded ? (
				<InputLabel style={{ backgroundColor: 'white', marginLeft: 4 }}>{label}</InputLabel>
			) : null}

			<Select
				displayEmpty
				labelId={`${label}${name}`}
				key={{ name }}
				id={name}
				placeholder={placeholder}
				sx={{
					...(style
						? style
						: {
								borderColor: '#C7C7D1'
							}),
					...{
						border: error ? '1px solid #ff0000' : 'undefined',
						borderRadius: '8px'
					}
				}}
				value={hasValue(value) ? value : multiple ? [] : ''}
				onChange={onChangeSelect}
				disabled={!!readOnly}
				multiple={multiple}
				renderValue={multiple ? renderValue || defaultRenderValue : undefined}
				{...omit(otherProps, ['options'])}>
				{menuNone && !multiple && (
					<MenuItem id={'-'} key={'-'} value={undefined}>
						{<em>Nenhum</em>}
					</MenuItem>
				)}

				<MenuItem disabled value="">
					{defaultValue ?? placeholder}
				</MenuItem>

				{menuNotSelected && !multiple && (
					<MenuItem id={'noSelect'} key={'noSelect'} value={'#-#'}>
						- Não selecionado -
					</MenuItem>
				)}

				{(options || []).map((opt: IOption) => {
					return (
						<MenuItem
							id={hasValue(opt.value) ? opt.value : opt}
							key={hasValue(opt.value) ? opt.value + '' : opt}
							value={hasValue(opt.value) ? opt.value : opt}>
							{multiple && <Checkbox checked={hasValue(value) && value.includes(opt.value || opt)} />}
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
		</div>
	);
};
