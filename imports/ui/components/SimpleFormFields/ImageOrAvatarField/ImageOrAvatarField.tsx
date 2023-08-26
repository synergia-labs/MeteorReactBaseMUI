import React from 'react';

import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import AvatarGeneratorField from '/imports/ui/components/SimpleFormFields/AvatarGeneratorField/AvatarGeneratorField';
import ImageCompactField from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { imageOrAvatarStyle } from './ImageOrAvatarFieldStyle';
import { hasValue } from '/imports/libs/hasValue';

import PropTypes from 'prop-types';

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const [imageOrAvatar, setImageOrAvatar] = React.useState(null);
	const [img, setImg] = React.useState(value);

	const handleOnChangeAvatar = (evt) => {
		setImageOrAvatar(evt.target.value === '-' || evt.target.value === null ? null : 'avatar');
		onChange({ ...evt, name }, { name, value: evt.target.value });
	};
	const handleOnChangeImage = (evt) => {
		setImageOrAvatar(evt.target.value === '-' || evt.target.value === null ? null : 'image');
		onChange({ ...evt, name }, { name, value: evt.target.value });
	};

	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}>
				{value === index && (
					<Box p={3}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.any.isRequired,
		value: PropTypes.any.isRequired
	};

	return (
		<div
			key={name}
			style={error ? imageOrAvatarStyle.containerImageOrAvatarError : imageOrAvatarStyle.containerImageOrAvatar}>
			<SimpleLabelView label={label} disabled={readOnly} />

			{readOnly ? (
				<div key={name} id={name}>
					{hasValue(value) && value != '' && value != '-' ? (
						<div>
							<img
								src={value}
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = '/images/wireframe/imagem_default.png';
								}}
								id={name}
								style={{
									maxHeight: '150px',
									height: '100%',
									width: '100%',
									maxWidth: '150px'
								}}
							/>
						</div>
					) : readOnly ? (
						<div style={imageOrAvatarStyle.containerEmptyMidia}>{'Não há mídia'}</div>
					) : null}
				</div>
			) : null}

			{!readOnly ? (
				<div style={imageOrAvatarStyle.containerImageOrAvatarButton}>
					{!imageOrAvatar || imageOrAvatar === 'image' ? (
						<ImageCompactField
							name={`${name}_img`}
							width={150}
							height={150}
							onChange={handleOnChangeImage}
							error={error}
							otherProps={otherProps}
							value={value}
							readOnly={readOnly}
						/>
					) : null}
					{!imageOrAvatar || imageOrAvatar === 'avatar' ? (
						<AvatarGeneratorField
							name={`${name}_avt`}
							onChange={handleOnChangeAvatar}
							error={error}
							otherProps={otherProps}
							value={value}
							readOnly={readOnly}
						/>
					) : null}
				</div>
			) : null}
		</div>
	);
};
