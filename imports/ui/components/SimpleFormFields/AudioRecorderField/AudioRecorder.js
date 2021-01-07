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

  const [values, setValues] = React.useState({ recordButton: true});

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
            //console.log(reader.result);
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

    const stop = document.querySelector('.stop');
    stop.onclick = function() {
      recorder.stop();
      console.log("recorder stopped, data available");
    }

        /*setTimeout(() => {
        console.log(recorder.state);
        recorder.stop(); // Stopping the recorder after 3 seconds
        console.log(recorder.state);
    }, 3000);*/

  };

  const handleStopRecordAudio = (event) => {
    setValues({
      ...values,
      ['recordButton']: !values.recordButton});
  };

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>
          <audio controls="controls" autobuffer="autobuffer" autoPlay="autoplay">
            <source src={value}/>
        </audio>
        </div>)
    }

    return (
      <div key={name} style={audioRecorderStyle.containerRecord}>
        <Fab color="secondary" aria-label="record" className="record" disabled={!values.recordButton} style={audioRecorderStyle.buttonOptions}>
            <KeyboardVoiceIcon onClick={handleRecordAudio} value={values.recordButton} />
        </Fab>

        <Fab color="secondary" aria-label="play" className="stop" disabled={values.recordButton} style={audioRecorderStyle.buttonOptions}>
            <StopIcon onClick={handleStopRecordAudio} value={values.recordButton}  />
        </Fab>

        <audio controls="controls" autobuffer="autobuffer" autoPlay="autoplay" style={audioRecorderStyle.buttonOptions}>
            <source src={value}/>
        </audio>
      </div>
    )
}
