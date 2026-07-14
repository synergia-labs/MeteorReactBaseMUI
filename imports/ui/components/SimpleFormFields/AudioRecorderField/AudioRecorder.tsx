import React from 'react';

import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import Fab from '@mui/material/Fab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { audioRecorderStyle } from './AudioRecorderStyle';
import { hasValue } from '/imports/libs/hasValue';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

export default ({ name, label, value, onChange, readOnly, error }: IBaseSimpleFormComponent) => {
	const [values, setValues] = React.useState({
		recordButton: true,
		stopButton: false,
		audioButton: false,
		deleteButton: false
	});
	const [seconds, setSeconds] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);
	const [hours, setHours] = React.useState(0);

	const recorderRef = React.useRef<MediaRecorder | null>(null);

	const deleteAudio = () => {
		onChange?.({ target: { value: '-' } }, { name, value: '-' });

		setValues({
			...values,
			recordButton: true,
			stopButton: false,
			audioButton: false,
			deleteButton: false
		});
	};

	const onSuccess = (stream: MediaStream) => {
		const recorder = new MediaRecorder(stream, {
			mimeType: 'audio/ogg; codecs=opus'
		});
		recorderRef.current = recorder;

		recorder.start(); // Starting the record

		recorder.ondataavailable = (e: any) => {
			// Converting audio blob to base64
			const reader = new FileReader();
			reader.onloadend = () => {
				// console.log(reader.result);
				onChange?.({ name, target: { name, value: reader.result } }, { name, value: reader.result });
			};

			reader.readAsDataURL(e.data);
		};
	};

	const handleRecordAudio = async () => {
		setValues({
			...values,
			recordButton: false,
			stopButton: true,
			audioButton: false,
			deleteButton: false
		});

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			onSuccess(stream);
		} catch (error) {
			console.error('Não foi possível acessar o microfone', error);
		}
	};

	React.useEffect(() => {
		if (!values.recordButton) {
			if (seconds < 60) {
				setTimeout(() => setSeconds(seconds + 1), 1000);
			} else if (seconds == 60) {
				setTimeout(() => setSeconds(0), 1000);
				if (minutes < 60) {
					setTimeout(() => setMinutes(minutes + 1), 1000);
				} else if (minutes == 60) {
					setTimeout(() => setMinutes(0), 1000);
					if (hours < 24) {
						setTimeout(() => setHours(hours + 1), 1000);
					} else if (hours == 24) {
						setTimeout(() => setHours(0), 1000);
					}
				}
			}
		} else {
			setHours(0);
			setMinutes(0);
			setSeconds(0);
		}
	});

	const handleStopRecordAudio = () => {
		recorderRef.current?.stop();
		recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
		setValues({
			...values,
			recordButton: true,
			stopButton: false,
			audioButton: true,
			deleteButton: true
		});
	};

	if (readOnly) {
		return (
			<div key={name}>
				<SimpleLabelView label={label ?? ''} disabled={readOnly} />

				{hasValue(value) && value != '-' ? (
					<p>
						<audio src={value} controlsList={'nodownload'} controls style={audioRecorderStyle.buttonOptions} />
					</p>
				) : (
					<div style={audioRecorderStyle.containerEmptyAudio}>{'Não há aúdio'}</div>
				)}
			</div>
		);
	}

	return (
		<div key={name} style={error ? audioRecorderStyle.containerRecordError : audioRecorderStyle.containerRecord}>
			<SimpleLabelView label={label ?? ''} disabled={readOnly} />
			<div style={audioRecorderStyle.subContainerRecord}>
				{!hasValue(value) || value == '-' ? (
					<span style={audioRecorderStyle.subContainerRecord}>
						<Fab
							color="secondary"
							onClick={handleRecordAudio}
							aria-label="record"
							className="record"
							id="record"
							disabled={!values.recordButton}
							style={audioRecorderStyle.buttonOptions}>
							<SysIcon name={'keyboardVoice'} />
						</Fab>

						<Fab
							color="secondary"
							aria-label="play"
							className="stop"
							onClick={handleStopRecordAudio}
							disabled={!values.stopButton}
							style={audioRecorderStyle.buttonOptions}>
							<SysIcon name={'stop'} />
						</Fab>

						{values.recordButton ? (
							''
						) : (
							<Fab color="secondary" style={audioRecorderStyle.buttonCountOptions}>
								{`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
									seconds < 10 ? `0${seconds}` : seconds
								}`}
							</Fab>
						)}
					</span>
				) : (
					<span style={audioRecorderStyle.subContainerRecord}>
						<audio src={value} controlsList={'nodownload'} controls style={audioRecorderStyle.buttonOptions} />
						<Fab
							color="secondary"
							aria-label="delete"
							className="delete"
							style={audioRecorderStyle.buttonOptions}
							onClick={deleteAudio}>
							<SysIcon name={'delete'} />
						</Fab>
					</span>
				)}
			</div>
		</div>
	);
};
