import React from 'react';

import omit from 'lodash/omit';

import InputBase from '@mui/material/InputBase';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import makeStyles from '@mui/styles/makeStyles';

import { createStyles, Theme } from '@mui/material/styles';

import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';

import * as appStyle from '/imports/ui/materialui/styles';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

export default ({
	error,
	help,
	label,
	name,
	placeholder,
	readOnly,
	schema,
	style,
	value,
	onChange,
	...otherProps
}: IBaseSimpleFormComponent & TextFieldProps) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: { height: 50 }
		})
	);

	const classes = useStyles();

	const fieldValue =
		value === '-'
			? '-'
			: schema && schema.type === Date && !!value && value instanceof Date
				? value.toLocaleDateString('pt-BR')
				: value;

	const applyMask = (inputValue: string, mask: string) => {
		let text = '';
		const data = inputValue;
		let c;

		let m;

		let i;

		let x;

		let valueCharCount = 0;
		for (i = 0, x = 1; x && i < mask.length; ++i) {
			c = data.charAt(valueCharCount);
			m = mask.charAt(i);

			if (valueCharCount >= data.length) {
				// console.log("break;");
				break;
			}

			switch (mask.charAt(i)) {
				case '9': // Number
				case '#': // Number
					if (/\d/.test(c)) {
						text += c;
						valueCharCount++;
						// console.log("text += c;");
					} else {
						x = 0;
						// console.log("x = 0;");
					}
					break;

				case '8': // Alphanumeric
				case 'A': // Alphanumeric
					if (/[a-z]/i.test(c)) {
						text += c;
						valueCharCount++;
					} else {
						x = 0;
					}
					break;

				case '7': // Number or Alphanumerica
				case 'N': // Number or Alphanumerica
					if (/[a-z0-9]/i.test(c)) {
						text += c;
						valueCharCount++;
					} else {
						x = 0;
					}
					break;

				case '6': // Any
				case 'X': // Any
					text += c;
					valueCharCount++;

					break;

				default:
					if (m === c) {
						text += m;
						valueCharCount++;
					} else {
						text += m;
					}

					break;
			}
		}
		return text;
	};

	const onFieldChange = (e) => {
		const newValue = e.target.value;
		onChange({ name, target: { name, value: newValue } }, { name, value: newValue });
	};

	const handleApplyMask = (event: React.BaseSyntheticEvent) => {
		const mask = otherProps && otherProps.mask ? otherProps.mask : schema && schema.mask ? schema.mask : undefined;

		if (mask) {
			const inputValue = applyMask(event.target.value, mask);
			onFieldChange({ name, target: { name, value: inputValue } }, { name, value: inputValue });
		} else {
			onFieldChange({ name, target: { name, value: event.target.value } }, { name, value: event.target.value });
		}
	};

	if (readOnly) {
		return (
			<div
				key={name}
				style={{
					display: 'flex',
					flexDirection: 'column',
					...appStyle.fieldContainer
				}}>
				{label && !otherProps.rounded ? (
					<SimpleLabelView label={label} style={style ? style.displayLabel : undefined} help={help} />
				) : null}
				<TextField
					key={name}
					InputProps={otherProps.rounded ? { classes: classes } : undefined}
					{...omit(otherProps, ['placeholder'])}
					onChange={onFieldChange}
					value={fieldValue}
					error={!!error}
					disabled={!!readOnly}
					id={name}
					name={name}
					label={otherProps.rounded ? label : null}
					type={'text'}
				/>
			</div>
		);
	}

	if (otherProps.isNaked) {
		return (
			<InputBase
				key={name}
				onChange={onChange}
				value={fieldValue}
				error={!!error}
				disabled={!!readOnly}
				id={name}
				name={name}
				label={otherProps.labelDisable ? undefined : label}
				{...otherProps}
			/>
		);
	}

	return (
		<div
			key={name}
			style={{
				display: 'flex',
				flexDirection: 'column',
				...appStyle.fieldContainer
			}}>
			<SimpleLabelView label={label} />
			<TextField
				{...otherProps}
				key={name}
				placeholder={placeholder}
				onChange={handleApplyMask}
				value={fieldValue}
				error={!!error}
				disabled={!!readOnly}
				id={name}
				name={name}
				label={null}
				help={help}
				style={style ? { displayLabel: style.displayLabel } : undefined}
			/>
		</div>
	);
};
