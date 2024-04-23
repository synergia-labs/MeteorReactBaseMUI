import React from 'react';
import Button from '@mui/material/Button';
import { colors, simpleExportCSVStyle } from './SimpleExportCSVStyle';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SimpleExportCSV = ({ filter, options, publishName, api, filename }: any) => {
	const [showLoading, setShowLoading] = React.useState(false);

	const showNotification = () => (
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
		api.downloadCSV(publishName, filter, options, (err: boolean, csvLink) => {
			if (err) {
				console.log(err);
			} else {
				console.log(csvLink);
				setShowLoading(false);
				const link = document.createElement('a');
				link.download = (filename || 'dadosExportados') + '.csv';
				link.href = csvLink;
				link.click();
			}
		});
	};

	return (
		<div style={simpleExportCSVStyle.containerDoubleSelect}>
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
					color: colors.secondaryColor,
					textTransform: 'none'
				}}
				color={'secondary'}
				onClick={() => {
					setShowLoading(true);
					downloadCSV();
				}}>
				{'Exportar para CSV'}
			</Button>
			{showLoading && showNotification()}
		</div>
	);
};

export default SimpleExportCSV;
