import React, { useEffect, useState } from 'react';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from '/imports/ui/materialui/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { isMobile } from '/imports/libs/deviceVerify';
import Typography from '@mui/material/Typography';

let timeoutOnChange;

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const formatSchemaName = otherProps.formatSchemaName;
	const outroSchemaName = otherProps.outroSchemaName;
	const formatOptions = otherProps.schemaAux[formatSchemaName].options;

	const [dateValue, setDateValue] = useState(
		value && value instanceof Date && hasValue(value) ? new Date(value) : undefined
	);
	const [format, setFormat] = useState(otherProps.doc[formatSchemaName] || 'data');
	const [outro, setOutro] = useState(otherProps.doc[outroSchemaName] || '');
	const [ano, setAno] = useState(hasValue(value) ? new Date(value).getFullYear() : undefined);

	useEffect(() => {
		if (value instanceof Date && hasValue(value) && value !== dateValue) {
			setDateValue(hasValue(value) ? new Date(value) : new Date());
		}
	}, [value]);

	const handleChange = (evt) => {
		timeoutOnChange && clearTimeout(timeoutOnChange);
		if (!evt.target.value) {
			onChange({ name, target: { name, value: null } });
			setDateValue(evt.target.value);
			return;
		}

		timeoutOnChange = setTimeout(() => {
			try {
				if (evt.target.value === '') {
					onChange({ name, target: { name, value: evt.target.value } });
				}
				const date = new Date(evt.target.value);
				if (!isNaN(date.getTime())) {
					date.setHours(date.getHours() + 10);
					onChange({ name, target: { name, value: date } });
				}
			} catch (e) {
				console.log('Data Inválida', e);
			}
		}, 1000);

		setDateValue(evt.target.value);
	};

	const onBlur = () => {
		if (new Date(dateValue) !== new Date(value)) {
			try {
				const date = new Date(dateValue);
				if (!isNaN(date.getTime())) {
					date.setHours(date.getHours() + 10);
					onChange({ name, target: { name, value: date } });
				}
			} catch (e) {
				console.log('Data Inválida', e);
			}
		}
	};

	const handleChangeFormat = (evt) => {
		onChange({
			name: formatSchemaName,
			target: { formatSchemaName, value: evt.target.value }
		});
		setFormat(evt.target.value);
	};

	const handleChangeOutro = (evt) => {
		onChange({
			name: outroSchemaName,
			target: { outroSchemaName, value: evt.target.value }
		});
		setOutro(evt.target.value);
	};

	const applyMask = (inputValue: string, mask: string) => {
		let text = '';
		const data = inputValue;
		let c, m, i, x;

		let valueCharCount = 0;
		for (i = 0, x = 1; x && i < mask.length; ++i) {
			c = data.charAt(valueCharCount);
			m = mask.charAt(i);

			if (valueCharCount >= data.length) {
				break;
			}

			switch (mask.charAt(i)) {
				case '9': // Number
				case '#': // Number
					if (/\d/.test(c)) {
						text += c;
						valueCharCount++;
					} else {
						x = 0;
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

	const handleApplyMask = (event: React.BaseSyntheticEvent) => {
		const mask = '####';
		const inputValue = parseInt(applyMask(event.target.value, mask));
		if (inputValue > 0) {
			setAno(inputValue || undefined);
			const date = new Date(inputValue, 11, 31);
			onChange({ name, target: { name, value: date } }, { name, value: date });
		} else {
			setAno(undefined);
			onChange({ name, target: { name, value: null } }, { name, value: null });
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: isMobile ? '100%' : '40%',
					minWidth: isMobile ? '100%' : '40%',
					...appStyle.fieldContainer
				}}>
				<SimpleLabelView label={'Formato Data ' + otherProps.labelAddOn} disabled={readOnly} />
				<Select
					style={{ backgroundColor: '#f2f2f2', height: 53.63 }}
					value={format}
					onChange={handleChangeFormat}
					MenuProps={{
						anchorOrigin: {
							vertical: 'bottom',
							horizontal: 'center'
						},
						transformOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						getContentAnchorEl: null
					}}>
					{formatOptions.map((option) => {
						return (
							<MenuItem value={option.value}>
								<Typography component={'p'}>{option.label}</Typography>
							</MenuItem>
						);
					})}
				</Select>
			</div>

			{format === 'desconhecida' && (
				<div
					key={name}
					style={{
						display: 'flex',
						flexDirection: 'column',
						...appStyle.fieldContainer
					}}>
					<SimpleLabelView label={'Data ' + otherProps.labelAddOn} disabled={readOnly} />
					<TextField
						key={'data_desconhecida'}
						error={!!error}
						disabled={true}
						id={'data_desconhecida'}
						name={'data_desconhecida'}
						label={null}
						type="date"
						InputLabelProps={{
							shrink: true
						}}
					/>
				</div>
			)}

			{format === 'data' && (
				<div
					key={name}
					style={{
						display: 'flex',
						flexDirection: 'column',
						...appStyle.fieldContainer
					}}>
					<SimpleLabelView label={'Data ' + otherProps.labelAddOn} disabled={readOnly} />
					<TextField
						key={name}
						onChange={handleChange}
						onBlur={onBlur}
						value={dateValue && dateValue instanceof Date ? dateValue.toISOString().split('T')[0] : null}
						error={!!error}
						disabled={!!readOnly}
						id={name}
						name={name}
						label={null}
						type="date"
						inputProps={{
							max: '9999-12-31'
						}}
						InputLabelProps={{
							shrink: true
						}}
						{...otherProps}
					/>
				</div>
			)}

			{format === 'somenteAno' && (
				<div
					key={name}
					style={{
						display: 'flex',
						flexDirection: 'column',
						...appStyle.fieldContainer
					}}>
					<SimpleLabelView label={'Ano ' + otherProps.labelAddOn} disabled={readOnly} />
					<TextField
						key={'somente_ano'}
						onChange={handleApplyMask}
						value={ano}
						error={!!error}
						disabled={!!readOnly}
						id={name}
						name={'ano'}
						label={null}
						type="number"
						InputLabelProps={{
							shrink: true
						}}
						{...otherProps}
					/>
				</div>
			)}

			{format === 'outrosAno' && (
				<div
					style={{
						display: 'flex',
						flexDirection: isMobile ? 'column' : 'row',
						width: '100%'
					}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: isMobile ? '100%' : '40%',
							...appStyle.fieldContainer
						}}>
						<SimpleLabelView label={'Outros'} disabled={readOnly} />
						<TextField
							key={'data_outro'}
							onChange={handleChangeOutro}
							value={outro}
							error={!!error}
							disabled={!!readOnly}
							id={name}
							name={name}
							label={null}
							type="text"
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{ maxLength: 70 }}
							{...otherProps}
						/>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							maxWidth: isMobile ? '100%' : '30%',
							...appStyle.fieldContainer
						}}>
						<SimpleLabelView label={'Ano ' + otherProps.labelAddOn} />
						<TextField
							key={'outro_ano'}
							onChange={handleApplyMask}
							value={ano}
							error={!!error}
							disabled={!!readOnly}
							id={name}
							name={'ano'}
							label={null}
							type="number"
							InputLabelProps={{
								shrink: true
							}}
							{...otherProps}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
