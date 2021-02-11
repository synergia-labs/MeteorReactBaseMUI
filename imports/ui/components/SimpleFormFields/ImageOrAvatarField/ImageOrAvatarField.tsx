import React from "react";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import AvatarGeneratorField from "/imports/ui/components/SimpleFormFields/AvatarGeneratorField/AvatarGeneratorField";
import ImageCompactField from "/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField";

import Button from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';
import Divider from '@material-ui/core/Divider';

import Fab from "@material-ui/core/Fab";

import {imageOrAvatarStyle} from "./ImageOrAvatarFieldStyle";
import {hasValue} from "/imports/libs/hasValue";
import {isMobile} from "/imports/libs/deviceVerify";

export default ({name, label, value, onChange, readOnly, error, ...otherProps}:IBaseSimpleFormComponent)=>{

  const [imageOrAvatar, setImageOrAvatar] = React.useState(false);

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>
          {hasValue(value) && value!='' && value!='-' ?
            <div key={name}>
                    <div style={{
                        height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                        transform: (window.innerWidth) < 901 ? `scale(${((window.innerWidth -
                            (isMobile ? 44 : 130)) / 900)})` : undefined,
                        transformOrigin: (window.innerWidth) < 901 ? '0 0' : undefined,
                    }}>
                        <img
                            src={value}
                            style={{
                                maxHeight: '150px',
                                height: '100%', width: '100%',
                                maxWidth: '150px',
                            }}
                        />
                    </div>
            </div> : ( !!readOnly ? <div style={imageOrAvatarStyle.containerEmptyMidia}>{'Não há mídia'}</div>: null)
          }
        </div>)
    }

    return (
      <div key={name} style={error? imageOrAvatarStyle.containerImageOrAvatarError:imageOrAvatarStyle.containerImageOrAvatar}>
        <SimpleLabelView label={label}/>
        <div key={name} style={imageOrAvatarStyle.containerImageOrAvatarButton}>
          <div>
            {!!imageOrAvatar ?
              <ImageCompactField
                label={'Imagem Zoom+Slider'}
                name={name}
                onChange={onChange}
                readOnly={readOnly}
                error={error}
                otherProps={otherProps}
                value={value}
              /> :
              <AvatarGeneratorField
                label={'Avatar'}
                name={name}
                onChange={onChange}
                readOnly={readOnly}
                error={error}
                otherProps={otherProps}
                value={value}
              />
            }
          </div>

          <div style={imageOrAvatarStyle.containerImageOrAvatarFabButton}>
            <Fab
              onClick={() => {
                setImageOrAvatar(!imageOrAvatar);
              }}
              color={'primary'}
              style={imageOrAvatarStyle.selectImage}
            >
              <SyncIcon />
            </Fab>
          </div>

        </div>
      </div>
    )
}
