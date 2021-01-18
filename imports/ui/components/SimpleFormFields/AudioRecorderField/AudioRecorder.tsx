import React from "react";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import Fab from '@material-ui/core/Fab';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import TextField from "@material-ui/core/TextField";
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import {audioRecorderStyle} from "./AudioRecorderStyle";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {hasValue} from "/imports/libs/hasValue";

export default ({name,label,value,onChange,readOnly,error}:IBaseSimpleFormComponent)=>{

  const [values, setValues] = React.useState({ recordButton: true, stopButton: false, audioButton: false, deleteButton: false});

  let recorder:any = null;

  const deleteAudio = () => {
      onChange({},{name,value: '-'})
      setValues({
        ...values,
        ['recordButton']: true, ['stopButton']: false, ['audioButton']: false , ['deleteButton']: false
      });
  }

  const onSuccess = (stream:any) => {
    recorder = new MediaRecorder(stream, {
        type: 'audio/ogg; codecs=opus'
    });

    recorder.start(); // Starting the record

    recorder.ondataavailable = (e:any) => {
        // Converting audio blob to base64
        let reader = new FileReader()
        reader.onloadend = () => {
            //console.log(reader.result);
            onChange({},{name, value: reader.result}); // You can upload the base64 to server here.
        }

        reader.readAsDataURL(e.data);
    }
  };

  const handleRecordAudio = () => {

    setValues({
      ...values,
      ['recordButton']: false, ['stopButton']: true, ['audioButton']: false, ['deleteButton']: false
    });

    let timer = setInterval(count,1000);

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
      if(!!recorder){
        recorder.stop();
        $("#realtime").text(00 +":" + 00 + ":" + 00);
      }
    }
  };

  const plz = (digit) =>{

    var zpad = digit + '';
    if (digit < 10) {
        zpad = "0" + zpad;
    }
    return zpad;
  };

  const count = () => {
	var time_shown = $("#realtime").text();
        var time_chunks = time_shown.split(":");
        var hour=0, mins=0, secs=0;

        hour=Number(time_chunks[0]);
        mins=Number(time_chunks[1]);
        secs=Number(time_chunks[2]);
        secs++;
            if (secs==60){
                secs = 0;
                mins=mins + 1;
               }
              if (mins==60){
                mins=0;
                hour=hour + 1;
              }
              if (hour==13){
                hour=1;
              }

        $("#realtime").text(hour +":" + plz(mins) + ":" + plz(secs));
      };

  const handleStopRecordAudio = () => {
    setValues({
      ...values,
      ['recordButton']: true, ['stopButton']: false, ['audioButton']: true , ['deleteButton']: true });
  };

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>

          {hasValue(value)&&value!="-"?
            <p>
              <audio src={value}  controlsList={"nodownload"} controls="controls" autobuffer="autobuffer" style={audioRecorderStyle.buttonOptions}/>
            </p>
          : <div style={audioRecorderStyle.containerEmptyAudio}>{'Não há aúdio'}</div>}
        </div>)
    }

    return (
      <div key={name} style={error? audioRecorderStyle.containerRecordError:audioRecorderStyle.containerRecord}>
        <SimpleLabelView label={label}/>
        <div style={audioRecorderStyle.subContainerRecord}>
          {value=="-" ?
              <span style={audioRecorderStyle.subContainerRecord}>
              <Fab color="secondary" aria-label="record" className="record" disabled={!values.recordButton} style={audioRecorderStyle.buttonOptions}>
                  <KeyboardVoiceIcon onClick={handleRecordAudio} value={values.recordButton} />
              </Fab>

              <Fab color="secondary" aria-label="play" className="stop" disabled={!values.stopButton} style={audioRecorderStyle.buttonOptions}>
                  <StopIcon onClick={handleStopRecordAudio} value={values.stopButton} />
              </Fab>

              {values.recordButton?'':
                <Fab variant="outlined" color="#5a9902" aria-label="play" id="realtime" className="realtime" disabled={values.recordButton} style={audioRecorderStyle.buttonCountOptions}>
                    {'00:00:00'}
                </Fab>
              }
          </span> :
          <span style={audioRecorderStyle.subContainerRecord}>
            <audio src={value} controlsList={"nodownload"} controls="controls" autobuffer="autobuffer" style={audioRecorderStyle.buttonOptions}/>
              <Fab color="secondary" aria-label="delete" className="delete" style={audioRecorderStyle.buttonOptions}>
                <DeleteIcon onClick={deleteAudio} />
              </Fab>
          </span>
        }
        </div>
      </div>
    )
}
