import React from "react";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import AvatarGeneratorField from "/imports/ui/components/SimpleFormFields/AvatarGeneratorField/AvatarGeneratorField";
import ImageCompactField from "/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField";

import Button from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';
import Divider from '@material-ui/core/Divider';

import {imageOrAvatarStyle} from "./ImageOrAvatarFieldStyle";

export default ({name,label,value,onChange,readOnly,error, otherProps}:IBaseSimpleFormComponent)=>{

  const [imageOrAvatar, setImageOrAvatar] = React.useState(0);

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>
          {!!imageOrAvatar ?
            <ImageCompactField
              label={'Imagem Zoom+Slider'}
              name={'imageC'}
              onChange={onChange}
            /> :
            <AvatarGeneratorField
              label={'Avatar'}
              name={'avatar'}
              onChange={onChange}
            />
          }
        </div>)
    }

    return (
      <div key={name} style={error? imageOrAvatarStyle.containerImageOrAvatarError:imageOrAvatarStyle.containerImageOrAvatar}>
        <SimpleLabelView label={label}/>
        <div key={name} style={imageOrAvatarStyle.containerImageOrAvatarButton}>
          <Button
            variant="contained"
            color="default"
            style={imageOrAvatarStyle.selectImage}
            startIcon={<SyncIcon />}
            onClick={() => setImageOrAvatar(!imageOrAvatar)}
            >
            {'Trocar'}
          </Button>

          <Divider style={imageOrAvatarStyle.dividerImageOrAvatar} orientation="vertical" flexItem/>

          <div style={imageOrAvatarStyle.subContainerImageOrAvatar}>
            {!!imageOrAvatar ?
              <ImageCompactField
                label={'Imagem Zoom+Slider'}
                name={'imageC'}
                onChange={onChange}
              /> :
              <AvatarGeneratorField
                label={'Avatar'}
                name={'avatar'}
                onChange={onChange}
              />
            }
          </div>
        </div>
      </div>
    )
}
