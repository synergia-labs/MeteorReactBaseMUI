import React, { useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import Konva from 'konva';
import { characteres } from './Characteres';
import { avatarGeneratorStyle } from './AvatarGeneratorFieldStyle';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';


const drawCharacter = (character, charObj, layer = null, listOfObjects = null) => {
	if (!layer || !listOfObjects) {
		return;
	}
	if (typeof characteres[character].formats[charObj.format] === 'string') {
		const path = new Konva.Path({
			x: 0,
			y: 0,
			data: characteres[character].formats[charObj.format],
			draggable: characteres[character].draggable || false,
			fill: charObj.color || characteres[character].colors[0] || '#9a4f2b',
			opacity: characteres[character].fillOpacity
		});
		layer.add(path);
		listOfObjects.push(path);
	} else if (Array.isArray(characteres[character].formats[charObj.format])) {
		characteres[character].formats[charObj.format].forEach((subFormat) => {
			if (typeof subFormat === 'string') {
				var path = new Konva.Path({
					x: 0,
					y: 0,
					data: subFormat,
					draggable: characteres[character].draggable || false,
					fill: charObj.color || characteres[character].colors[0] || '#9a4f2b',
					opacity: characteres[character].fillOpacity
				});
				layer.add(path);
				listOfObjects.push(path);
			} else if (subFormat.type === 'path') {
				var path = new Konva.Path({
					x: 0,
					y: 0,
					data: subFormat.path,
					draggable: characteres[character].draggable || false,
					fill: subFormat.fill || charObj.color || characteres[character].colors[0] || '#000000',
					opacity: subFormat.fillOpacity || characteres[character].fillOpacity
				});
				layer.add(path);
				listOfObjects.push(path);
			} else if (subFormat.type === 'circle') {
				var path = new Konva.Circle({
					x: subFormat.cx,
					y: subFormat.cy,
					draggable: characteres[character].draggable || false,
					radius: subFormat.r,
					stroke: subFormat.stroke,
					strokeWidth: subFormat.strokeWidth,
					opacity: subFormat.fillOpacity || characteres[character].fillOpacity,
					fill: subFormat.fill || charObj.color || characteres[character].colors[0] || '#000000'
				});
				layer.add(path);
				listOfObjects.push(path);
			} else if (subFormat.type === 'polygon') {
				const points = subFormat.points
					.trim()
					.replace(/ /g, ',')
					.split(',')
					.map((n) => parseInt(n));
				points.push(points[0]); // Fechar o POligono
				points.push(points[1]); // Fechar o POligono
				var path = new Konva.Line({
					points,
					draggable: characteres[character].draggable || false,
					globalCompositeOperation: 'source-over',
					stroke: subFormat.stroke || subFormat.fill || charObj.color || '#000000',
					strokeWidth: subFormat.strokeWidth || 0.9,
					opacity: subFormat.fillOpacity || characteres[character].fillOpacity,
					fill: subFormat.fill || charObj.color || characteres[character].colors[0] || '#000000'
				});
				layer.add(path);
				listOfObjects.push(path);
			}
		});
	}
};

const CharView = React.memo(({ name, character, charData }) => {
	useEffect(() => {
		const defaultStage = new Konva.Stage({
			container: `container${name}`,
			width: 100,
			height: 100,
			scaleX: 0.3,
			scaleY: 0.3,
			draggable: false,
			drawBorder: false
		});
		const defaultLayer = new Konva.Layer();
		// add the shape to the layer
		defaultStage.add(defaultLayer);
		const list = [];
		if (character === 'hair') {
			drawCharacter(character, charData, defaultLayer, list);
		}
		drawCharacter('body', { format: 'default' }, defaultLayer, list);
		drawCharacter('neck', { format: 'default' }, defaultLayer, list);
		drawCharacter('nose', { format: 'default' }, defaultLayer, list);
		if (character !== 'hair') {
			drawCharacter(character, charData, defaultLayer, list);
		}

		defaultLayer.batchDraw();

		return function cleanup() {
			list.forEach((obj) => {
				obj.destroy();
			});
			defaultLayer.destroy();
			defaultStage.destroy();
		};
	});

	return (
		<div
			id={`container${name}`}
			style={{
				width: 100,
				height: 100,
				flex: 1
			}}
		/>
	);
});

class AvatarGeneratorField extends React.Component<IBaseSimpleFormComponent> {
	constructor(props: IBaseSimpleFormComponent) {
		super(props);
		this.state = {
			imageData: this.props.value,
			body: { format: 'default', color: characteres.body.colors[0] },
			neck: { format: 'default' },
			nose: { format: 'default' },
			open: false,
			width: 150,
			height: 150,
			readOnly: this.props.readOnly
		};

		this.listOfDefaultLayersObjects = [];
	}

	drawAvatar = () => {
		const list = Object.keys(characteres);
		this.listOfDefaultLayersObjects.forEach((obj) => {
			obj.destroy();
		});

		list.forEach((character) => {
			if (this.state[character]) {
				drawCharacter(character, this.state[character], this.defaultLayer, this.listOfDefaultLayersObjects);
			}
		});

		this.defaultLayer.batchDraw();
	};

	initBoard = () => {
		const self = this;
		this.initAvatarBoard = true;

		this.defaultStage = new Konva.Stage({
			container: `avatarContainer${this.props.name}`,
			width: 198,
			height: 198,
			scaleX: 0.55,
			scaleY: 0.55,
			draggable: false,
			drawBorder: false
		});

		this.defaultLayer = new Konva.Layer();

		// add the shape to the layer

		this.defaultStage.add(this.defaultLayer);

		this.drawAvatar();
	};

	deleteAvatar = () => {
		this.setState([]);
		this.setState({ imageData: '' });
		const name = this.props.name;
		this.props.onChange({ target: { value: '-' } }, { name, value: '-' });
	};

	componentDidMount() {
		this.setState({ imageData: this.props.value });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.initAvatarBoard) {
			this.drawAvatar();
		}
	}

	onClose = () => {
		this.initAvatarBoard = false;
		if (this.props.onClose) {
			this.props.onClose();
		}
		this.setState({ open: false });
	};

	onSave = () => {
		this.onClose();
		const imageData = this.defaultStage.toDataURL({
			mimeType: 'image/png',
			quality: 1,
			// pixelRatio: Math.round(6/(Math.max(this.boardState.scale,1))),
			x: 0,
			y: 0,
			width: 198,
			height: 198
		});

		this.setState({ imageData });
		const name = this.props.name;
		this.props.onChange({ target: { value: imageData } }, { name, value: imageData });
	};

	render() {
		const list = [
			'body',
			'hair',
			'hair_front',
			'eyes',
			'eyebrows',
			'glasses',
			'mouths',
			'facialhair',
			'clothes',
			'accesories',
			'tattoos'
		];

		return (
			<div>
				<SimpleLabelView label={this.props.label} disabled={this.props.readOnly} />
				{hasValue(this.props.value) && this.props.value != '' && this.props.value != '-' ? (
					<div>
						<img
							src={this.props.value}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = '/images/wireframe/imagem_default.png';
							}}
							style={{
								maxHeight: this.state.height,
								height: '100%',
								width: '100%',
								maxWidth: this.state.width
							}}
						/>
					</div>
				) : this.props.readOnly ? (
					<div style={avatarGeneratorStyle.containerEmptyAvatar}>{'Não há avatar'}</div>
				) : null}

				{!this.props.readOnly ? (
					<div>
						{!(hasValue(this.props.value) && this.props.value != '' && this.props.value != '-') ? (
							<Button
								id="Selecionar Avatar"
								variant="contained"
								color="default"
								style={avatarGeneratorStyle.selectImage}
								startIcon={<SysIcon name={'face'}/>}
								onClick={() => this.setState({ open: true })}>
								{'Selecionar avatar'}
							</Button>
						) : null}

						{hasValue(this.props.value) && this.props.value != '' && this.props.value != '-' ? (
							<Button
								variant="contained"
								color="default"
								style={avatarGeneratorStyle.selectImage}
								startIcon={<SysIcon name={'delete'} />}
								onClick={() => this.deleteAvatar()}>
								{'Deletar'}
							</Button>
						) : null}

						<Dialog
							onClose={this.onClose}
							aria-labelledby="Inserir Image"
							open={this.state.open}
							style={{ minHeight: 400, minWidth: 400, overflow: 'hidden' }}
							onEntered={() => {
								this.initBoard();
							}}>
							<DialogTitle id="Gerar Avatar">{'Gerar avatar'}</DialogTitle>
							{this.state.open ? (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										height: 600,
										width: 600,
										overflow: 'hidden'
									}}>
									<div
										id={`avatarContainer${this.props.name}`}
										style={{
											backgroundColor: '#FFF',
											width: 198,
											height: 198
										}}
									/>
									<Button
										id="Avatar Aleatório"
										variant={'outlined'}
										color={'#74B9FF'}
										style={{
											borderColor: '#74B9FF',
											color: '#74B9FF',
											backgroundColor: '#FFF'
										}}
										onClick={() => {
											const newAvatar = {};
											list
												.filter((item) => ['neck', 'nose'].indexOf(item) === -1)
												.forEach((chr) => {
													newAvatar[chr] = {};
													const formats = Object.keys(characteres[chr].formats);
													const colors = characteres[chr].colors;

													newAvatar[chr].format = formats[Math.floor(Math.random() * formats.length)];
													newAvatar[chr].color = colors[Math.floor(Math.random() * colors.length)];
												});
											this.setState(newAvatar);
										}}>
										{'Aleatório'}
									</Button>

									<div
										key={'Lista'}
										style={{
											flex: 1,
											minWidth: 580,
											width: 580,
											maxHeight: 580,
											height: 580,
											overflowY: 'auto',
											overflowX: 'hidden',
											display: 'flex',
											flexDirection: 'column',
											paddingTop: '25px'
										}}>
										{list
											.filter((item) => ['neck', 'nose'].indexOf(item) === -1)
											.map((character) => (
												<div
													style={{
														borderBottom: '1px solid #808080',
														maxWidth: '100%',
														width: '100%',
														overflow: 'hidden',
														minHeight: 115,
														display: 'flex',
														flexDirection: 'row',
														justifyContent: 'center'
													}}>
													<div
														onClick={() =>
															this.setState({
																[character]: {
																	...(this.state[character] || {}),
																	color:
																		characteres[character].colors[
																			characteres[character].colors.indexOf(
																				this.state[character]
																					? this.state[character].color
																					: characteres[character].colors[0]
																			) + 1
																		] || characteres[character].colors[0]
																}
															})
														}
														style={{
															backgroundColor: '#FFF',
															width: 60,
															display: 'flex',
															flexDirection: 'column',
															justifyContent: 'space-between',
															alignItems: 'center',
															color: this.state[character]
																? this.state[character].color
																: characteres[character].colors[0],
															border: '3px solid',
															textAlign: 'center',
															fontSize: '11px',
															fontWeight: '600',
															borderColor: this.state[character]
																? this.state[character].color
																: characteres[character].colors[0],
															paddingTop: '20px'
														}}>
														{'TROCAR COR'}
														<div
															style={{
																backgroundColor: this.state[character]
																	? this.state[character].color
																	: characteres[character].colors[0],
																height: '42px',
																width: '100%'
															}}
														/>
													</div>
													{/* <span style={{fontWeight:'bold',height:25}}>{character}</span> */}
													<div
														key={character}
														style={{
															display: 'flex',
															flexDirection: 'row',
															maxWidth: '100%',
															width: '100%',
															minHeight: 115,
															overflowY: 'hidden',
															overflowX: 'auto'
														}}>
														<div
															onClick={
																character === 'body'
																	? undefined
																	: () =>
																			this.setState({
																				[character]: {
																					format: null,
																					color: characteres[character].colors[0]
																				}
																			})
															}
															style={{
																backgroundColor:
																	character !== 'body' && (!this.state[character] || !this.state[character].format)
																		? '#ffe691'
																		: '#FFFFFF',
																maxWidth: 100,
																minWidth: 100,
																display: 'flex',
																flexDirection: 'row',
																justifyContent: 'center',
																alignItems: 'center',
																color: '#808080'
															}}>
															{character === 'body' ? '' : 'NENHUM'}
														</div>
														{Object.keys(characteres[character].formats).map((format) => (
															<div
																key={format}
																onClick={() =>
																	this.setState({
																		[character]: {
																			format,
																			color:
																				this.state[character] && this.state[character].color
																					? this.state[character].color
																					: characteres[character].colors[0]
																		}
																	})
																}
																style={{
																	backgroundColor:
																		this.state[character] && this.state[character].format === format
																			? '#ffe691'
																			: '#FFFFFF',
																	height: 100,
																	width: 100
																}}>
																<CharView
																	key={character + format}
																	name={character + format}
																	character={character}
																	charData={{
																		format,
																		color:
																			this.state[character] && this.state[character].color
																				? this.state[character].color
																				: characteres[character].colors[0]
																	}}
																/>
															</div>
														))}
													</div>
												</div>
											))}
									</div>
								</div>
							) : null}
							<DialogActions>
								<Button
									id="Fechar Avatar"
									autoFocus
									onClick={this.onClose}
									variant={'outlined'}
									color={'#74B9FF'}
									style={{ borderColor: '#74B9FF', color: '#74B9FF' }}>
									{'Fechar'}
								</Button>
								<Button
									id="Salvar Avatar"
									onClick={this.onSave}
									variant={'contained'}
									color={'#74B9FF'}
									style={{
										borderColor: '#74B9FF',
										backgroundColor: '#74B9FF',
										color: '#FFF'
									}}>
									{'Salvar'}
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				) : null}
			</div>
		);
	}
}

// const mouths = {
//     colors:['#000000'],
//     fillOpacity:0.7,
//     formats: {
//
//     }
// }

export default AvatarGeneratorField;
