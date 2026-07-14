import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import AvatarEditor, { type AvatarEditorRef, type Position } from 'react-avatar-editor';

import { isMobile } from '/imports/libs/deviceVerify';
import { hasValue } from '/imports/libs/hasValue';

import { compactImageStyle } from './ImageCompactFieldStyle';
import * as appStyle from '/imports/ui/materialui/styles';

import Typography from '@mui/material/Typography';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

interface ImageCompactFieldProps extends IBaseSimpleFormComponent {
	width?: number;
	height?: number;
	compress?: boolean;
}

export default ({ name, value, onChange, readOnly, ...otherProps }: ImageCompactFieldProps) => {
	const [values, setValues] = React.useState({
		allowZoomOut: false,
		position: { x: 0.5, y: 0.5 },
		rotate: 0,
		preview: null
	});

	const [editor, setEditor] = React.useState<AvatarEditorRef | null>(null);
	const [image, setImage] = React.useState<File | null>(null);
	const [actualImage, setActualImage] = React.useState(value);

	const [scale, setScale] = React.useState(0.9);
	const [width, setWidth] = React.useState(otherProps.width || 250);
	const [height, setHeight] = React.useState(otherProps.height || 250);

	const handleScale = (_event: Event, valueScale: number | number[]) => {
		setScale(Array.isArray(valueScale) ? valueScale[0] : valueScale);
		handleSave();
	};

	const handleSave = () => {
		if (editor) {
			const img = !otherProps.compress ? editor.getImage().toDataURL() : editor.getImageScaledToCanvas().toDataURL();
			onChange?.({ target: { value: img } }, { name, value: img });
		}
	};

	const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedImage = e.target.files?.[0];
		if (!selectedImage || !_validarImagem(selectedImage)) {
			console.warn('A imagem selecionada possui um formato não suportado.');
			return;
		}
		setActualImage(null);
		setImage(selectedImage);
		const image = selectedImage;
		if (image) {
			const _URL = window.URL || window.webkitURL;
			const img = new Image();
			const objectUrl = _URL.createObjectURL(image);
			img.onload = function () {
				const maxValue = 250; ///window.innerWidth>550?550:window.innerWidth;
				const width = img.width;
				const height = img.height;
				if (width > height) {
					// const acceptMaxValue = (maxValue / width) * height < 300;
					const newW = maxValue;
					const newH = (maxValue / width) * height;
					newW !== width && setWidth(newW);
					newH !== height && setHeight(newH);
				} else {
					const newW = (maxValue / height) * width;
					const newH = maxValue;
					newW !== width && setWidth(newW);
					newH !== height && setHeight(newH);
				}
				_URL.revokeObjectURL(objectUrl);
			};
			img.src = objectUrl;
		}
		handleSave();
		try {
			const fileinput = document.getElementById(e.target.id) as HTMLInputElement | null;
			if (fileinput) fileinput.value = '';
		} catch (e) {}
	};

	const _validarImagem = (imagem: any): boolean => {
		const listaFormatosSuportados = [
			'image/apng',
			'image/avif',
			'image/gif',
			'image/jpeg',
			'image/png',
			'image/svg+xml',
			'image/webp',
			'image/bmp',
			'image/x-icon',
			'image/tiff'
		];
		if (!listaFormatosSuportados.includes(imagem.type)) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (!!readOnly || !image) {
			setActualImage(value);
			setScale(1);
			setWidth(otherProps.width || 250);
			setHeight(otherProps.height || 250);
		}
		if (readOnly) {
			setImage(null);
		}
	}, [value, readOnly]);

	const handlePositionChange = (position: Position) => {
		setValues({
			...values,
			['position']: position
		});
		handleSave();
	};

	const deleteImageCompact = () => {
		setImage(null);
		setActualImage(null);

		onChange?.({ target: { value: '' } }, { name, value: '' });
	};

	return (
		<div
			key={name}
			style={{
				...compactImageStyle.containerImage,
				...appStyle.fieldContainer,
				...{
					paddingBottom: 0,
					paddingTop: 0
				}
			}}>
			{readOnly ? (
				hasValue(actualImage) && actualImage != '' && actualImage != '-' ? (
					<div
						key={name + 'readOnly'}
						style={{
							minWidth: isMobile ? 'auto' : 0,
							minHeight: isMobile ? 'auto' : 0,
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center'
						}}>
						<img
							id={`image${name}ReadOnly`}
							key={`image${name}ReadOnly`}
							src={actualImage}
							onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
								e.currentTarget.onerror = null;
								e.currentTarget.width = 250;
								e.currentTarget.height = 250;
								e.currentTarget.style.cssText = '';
								e.currentTarget.src = '/images/wireframe/imagem_default.png';
							}}
							style={{
								width: '100%',
								height: 'auto',
								maxWidth: isMobile ? 250 : 500,
								maxHeight: isMobile ? 250 : 500
							}}
						/>
					</div>
				) : (
					<img
						src="/images/wireframe/imagem_default.png"
						style={{
							maxWidth: 250,
							maxHeight: 250,
							height: '100%',
							width: '100%'
						}}
					/>
				)
			) : null}

			{!readOnly ? (
				!actualImage && !!image ? (
					<div key={name + 'hasImage'}>
						<div
							style={{
								flexWrap: 'wrap',
								maxWidth: 'auto',
								display: 'flex',
								alignItems: 'end',
								justifyContent: 'end'
							}}>
							<div
								id={`buttonInsert${name}`}
								data-cy="dropzone"
								style={{
									...compactImageStyle.containerDropzone,
									padding: '0'
								}}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center'
									}}>
									<div style={{ textAlign: 'center' }}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												overflow: 'hidden',
												width: 'auto'
											}}>
											<AvatarEditor
												ref={(ref) => {
													setEditor(ref);
												}}
												scale={scale}
												width={width}
												height={height}
												color={[189, 189, 189, 1]}
												border={2}
												position={values.position}
												onPositionChange={handlePositionChange}
												rotate={values.rotate}
												onImageReady={handleSave}
												// onImageReady={handleSave}
												image={image}
												style={{ position: 'static' }}
											/>
											<Slider
												id={`slider${name}`}
												min={1}
												max={4}
												step={0.1}
												value={scale}
												onChange={handleScale}
												style={{
													padding: '10px 10px',
													width: 200,
													margin: '10px 10px',
													color: '#000000'
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : hasValue(actualImage) && actualImage !== '' && actualImage !== '-' ? (
					<div key={name + 'hasActualImage'}>
						<img
							id={`image${name}ActualImage`}
							key={`image${name}ActualImage`}
							src={actualImage}
							onError={(e) => {
								setActualImage(null);
							}}
							style={{
								maxHeight: height,
								height: 'auto',
								width: '100%',
								maxWidth: width,
								position: 'static'
							}}
						/>
					</div>
				) : null
			) : null}
			<input
				style={{ display: 'none' }}
				accept="image/*"
				id={`imageInput${name}`}
				type="file"
				name={`imageInput${name}`}
				onChange={handleNewImage}
			/>
			{(!actualImage || actualImage === '-' || !hasValue(actualImage)) && !image && !readOnly ? (
				<label htmlFor={`imageInput${name}`} style={{ width: '100%' }}>
					<div>
						<div
							style={{
								...compactImageStyle.containerGetConteudoDropzone,
								border: '1px dashed #BDBDBD'
							}}>
							<div
								id={`buttonInsert${name}`}
								data-cy="dropzone"
								style={{
									...compactImageStyle.containerDropzone,
									backgroundColor: 'transparent'
								}}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										color: '#858585'
									}}>
									<div style={{ textAlign: 'center' }}>
										<Typography variant="body1">{'+ Adicionar imagem'}</Typography>
									</div>
								</div>
							</div>
						</div>
					</div>
				</label>
			) : null}
			<div
				style={{
					width: 'fit-content',
					height: 25,
					padding: '21.5px 75.5px 18.9px 74.9px',
					borderRadius: '8px',
					backgroundColor: '#e26139'
				}}>
				{!readOnly && ((!!actualImage && actualImage !== '-' && hasValue(actualImage)) || !!image) ? (
					<Button
						variant="contained"
						color="secondary"
						size="small"
						startIcon={<SysIcon name={'delete'} />}
						onClick={deleteImageCompact}>
						Deletar
					</Button>
				) : null}
			</div>
		</div>
	);
};
