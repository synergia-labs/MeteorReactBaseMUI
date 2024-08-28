import React from 'react';
// @ts-ignore
import FileInputComponent from 'react-file-input-previews-base64';
import { hasValue } from '../../../../libs/hasValue';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { simpleImageStyle } from './SimpleImageUploadBase64Style';

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const onFileSelect = (fileData: any) => {
		let imgValue;
		if (fileData) {
			if (Array.isArray(fileData)) {
				imgValue = fileData[0].base64;
			} else {
				imgValue = fileData.base64;
			}
			onChange({ name, target: { name, value: imgValue } }, { name, value: imgValue });
		}
	};

	if (!readOnly) {
		return (
			<div key={name} style={simpleImageStyle.containerImage}>
				<SimpleLabelView label={label} disabled={readOnly} />
				<Avatar src={value} size="big" style={simpleImageStyle.containerShowImage} />
			</div>
		);
	}

	return (
		<div>
			<SimpleLabelView label={label} disabled={readOnly} />
			<FileInputComponent
				defaultFiles={hasValue(value) ? [value] : undefined}
				labelText={''}
				name={name}
				parentStyle={{ border: error ? '1px solid red' : undefined }}
				labelStyle={{ fontSize: 14 }}
				multiple={false}
				callbackFunction={onFileSelect}
				accept="image/*"
				buttonComponent={
					<Button
						variant="contained"
						color="default"
						style={simpleImageStyle.selectImage}
						startIcon={<SysIcon name={'photoCamera'} />}
						label="Selecionar imagem"
						arialabel="Selecionar imagem"
						id="Selecionar imagem">
						{'Selecionar imagem'}
					</Button>
				}
			/>
		</div>
	);
};
