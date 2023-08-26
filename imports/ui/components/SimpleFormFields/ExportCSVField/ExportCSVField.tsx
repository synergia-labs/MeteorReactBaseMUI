import React from 'react';
import Button from '@mui/material/Button';
import { exportCSVFieldStyle } from './ExportCSVFieldStyle';

import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { bemculturalApi } from '/imports/modules/bemcultural/api/bemculturalApi';
import { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';

export default ExportCSV = ({
	name,
	label,
	value,
	onChange,
	readOnly,
	error,
	bemculturals,
	...otherProps
}: IBaseSimpleFormComponent) => {
	const { filtroBasico, filtroAvancado, sort, skip, limit } = otherProps || {};

	const [showLoading, setShowLoading] = React.useState(false);

	const handleOnChangeSituacao = (evt) => {
		onChange(
			{ name, target: { name, value: { situacao: evt.target.value } } },
			{ name, value: { situacao: evt.target.value } }
		);
	};

	const showSnackBar = () => (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={showLoading}
			autoHideDuration={16000}
			onClose={() => setShowLoading(false)}>
			<Alert
				id={'message-id'}
				icon={false}
				arialabel={'message-id'}
				onClose={() => setShowLoading(false)}
				color={'info'}
				severity={'info'}
				elevation={6}
				variant="filled">
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<div>{'Aguarde enquanto o CSV está sendo gerado!'}</div>
					<div style={{ paddingTop: '5px' }}>
						<CircularProgress size={23} thickness={5} />
					</div>
				</div>
			</Alert>
		</Snackbar>
	);

	const downloadCSV = () => {
		bemculturalApi.downloadCSV(filtroAvancado, filtroBasico, { sort, skip, limit }, (err: boolean, csvLink) => {
			if (err) {
				console.log(err);
			} else {
				setShowLoading(false);
				const link = document.createElement('a');
				link.download = 'ListaBemCultural.csv';
				link.href = csvLink;
				link.click();
			}
		});
	};

	return (
		<div style={exportCSVFieldStyle.containerDoubleSelect}>
			<Button
				size="small"
				style={{
					marginRight: 10,
					justifyContent: 'flex-end',
					// fontFamily: 'PTSans',
					fontSize: '17px',
					fontWeight: 'bold',
					fontStretch: 'normal',
					fontStyle: 'normal',
					lineHeight: 1.2,
					letterSpacing: '0.7px',
					textAlign: 'center',
					color: '#e26139',
					textTransform: 'none'
				}}
				color={'secondary'}
				onClick={() => {
					setShowLoading(true);
					downloadCSV();
				}}>
				{'Exportar para CSV'}
			</Button>
			{showLoading && showSnackBar()}
		</div>
	);
};
