import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import Button from '@material-ui/core/Button';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import SimpleValueView from "/imports/ui/components/SimpleValueView/SimpleValueView";

import {audioRecorderStyle} from "./AudioRecorderStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{

  const [values, setValues] = React.useState({ textmask: value || '' });

  let recorder = null;

  const onsuccess = (stream) => {
    recorder = new MediaRecorder(stream, {
      type: 'audio/ogg; codecs=opus'
  });

  const deleteImage = () => {
      onChange({},{name,value: '-'})
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      ['textmask']: event.target.value,
    });
  };

  const handleAudio = (event) => {
    recorder.start(); // Starting the record

    recorder.ondataavailable = (e) => {
        // Converting audio blob to base64
        let reader = new FileReader()
        reader.onloadend = () => {
            console.log(reader.result);
            // You can upload the base64 to server here.
        }

        reader.readAsDataURL(e.data);
    }
    }

    navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

    navigator.getUserMedia({
        audio: true
    }, onsuccess, (e) => {
        console.log(e);
    });

    setTimeout(() => {
        recorder.stop(); // Stopping the recorder after 3 seconds
    }, 3000);

  };

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>
          <SimpleValueView value={(value+'')}/>
        </div>)
    }

    return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<KeyboardVoiceIcon />}
        onClick={handleAudio}
      >
        Talk
      </Button>
    );
}
