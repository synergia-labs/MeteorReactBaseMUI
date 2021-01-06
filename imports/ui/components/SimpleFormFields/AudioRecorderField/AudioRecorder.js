import React from "react";
import {hasValue} from "../../../../libs/hasValue";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import SimpleValueView from "/imports/ui/components/SimpleValueView/SimpleValueView";

import Fab from '@material-ui/core/Fab';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import {audioRecorderStyle} from "./AudioRecorderStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{

  const [values, setValues] = React.useState({ recordButton: true, playButton: false});

  let recorder = null;

  const deleteImage = () => {
      onChange({},{name,value: '-'})
  }

  const onSuccess = (stream) => {
    recorder = new MediaRecorder(stream, {
        type: 'audio/ogg; codecs=opus'
    });

    recorder.start(); // Starting the record

    recorder.ondataavailable = (e) => {
        // Converting audio blob to base64
        let reader = new FileReader()
        reader.onloadend = () => {
            console.log(reader.result);
            onChange({},{name, value: reader.result}); // You can upload the base64 to server here.
        }

        reader.readAsDataURL(e.data);
    }
  };

  const handleRecordAudio = (event) => {

    setValues({
      ...values,
      ['recordButton']: !values.recordButton,
    });

    navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

    navigator.getUserMedia({
        audio: true
    }, onSuccess, (e) => {
        console.log(e);

    });

    setTimeout(() => {
        console.log(recorder.state);
        recorder.stop(); // Stopping the recorder after 3 seconds
        console.log(recorder.state);
    }, 3000);
  };

  const handleStopRecordAudio = (event) => {
    setValues({
      ...values,
      ['recordButton']: !values.recordButton, ['playButton']: true,
    });

    /*setTimeout(() => {
    recorder.stop(); // Stopping the recorder after 3 seconds
  }, 3000);*/
    //recorder.stop(); // Stopping the recorder after button click
  };

  const handlePlayAudio = (event) => {
    var snd = new Audio(`data:audio/x-wav;base64, ${recorder}`);
    snd.play();

    setValues({
      ...values,
      ['playButton']: false,
    });
  };

  const handleStopAudio = (event) => {
    var snd = new Audio(`data:audio/x-wav;base64, ${recorder}`);
    snd.controls = true;
    document.body.appendChild(snd);
    snd.stop();

    setValues({
      ...values,
      ['playButton']: false,
    });
  };

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>
          <SimpleValueView value={(value+'')}/>
        </div>)
    }

    console.log(values.recordButton);

    return (
      <div key={name}>
        <Fab color="secondary" aria-label="record">
          { values.recordButton ?
            <KeyboardVoiceIcon onClick={handleRecordAudio} value={values.recordButton} /> : <StopIcon onClick={handleStopRecordAudio} value={values.recordButton} />
          }
        </Fab>
        {/*}
        <Fab color="primary" aria-label="play" disabled={!values.playButton}>
            <PlayIcon onClick={handlePlayAudio} value={values.playButton}  />
        </Fab>
        {*/}
        <audio controls="controls" autobuffer="autobuffer" autoPlay="autoplay">
            <source src={`data:audio/x-wav;base64, ${recorder}` }/>
        </audio>
      </div>
    )
}
