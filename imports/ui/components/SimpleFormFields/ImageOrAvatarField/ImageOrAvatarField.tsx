import React from "react";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import AvatarGeneratorField from "/imports/ui/components/SimpleFormFields/AvatarGeneratorField/AvatarGeneratorField";
import ImageCompactField from "/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {imageOrAvatarStyle} from "./ImageOrAvatarFieldStyle";
import {hasValue} from "/imports/libs/hasValue";

import PropTypes from 'prop-types';

export default ({name, label, value, onChange, readOnly, error, ...otherProps}:IBaseSimpleFormComponent)=>{

  const [imageOrAvatar, setImageOrAvatar] = React.useState(0);
  const [img, setImg] = React.useState(value);

    const handleOnChange = (evt) => {
        console.log('Evt',evt)
        onChange({...evt,name},{name, value: evt.target.value});
    }

  function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
    };

    const handleChange = (event, newValue) => {
      setImageOrAvatar(newValue);
    };

    return(
      <div key={name} style={error? imageOrAvatarStyle.containerImageOrAvatarError:imageOrAvatarStyle.containerImageOrAvatar}>
        <SimpleLabelView label={label}/>

        {!!readOnly ?
             (<div key={name} id={name}>
              {hasValue(value) && value!='' && value!='-' ?
                        (<div>
                            <img
                                src={value}
                                id={name}
                                style={{
                                    maxHeight: '150px',
                                    height: '100%', width: '100%',
                                    maxWidth: '150px',
                                }}
                            />
                        </div>
                ) : ( !!readOnly ? <div style={imageOrAvatarStyle.containerEmptyMidia}>{'Não há mídia'}</div>: null)
              }
            </div>) : null
        }

        { !readOnly? (
          <div style={imageOrAvatarStyle.containerImageOrAvatarButton}>
              <Tabs
                  orientation="horizontal"
                  variant="scrollable"
                  value={imageOrAvatar}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  style={imageOrAvatarStyle.tabs}
                >
                  <Tab label="Imagem Zoom+Slider" id='vertical-tab-0' aria-controls='vertical-tabpanel-0'/>
                  <Tab label="Avatar" id='vertical-tab-1' aria-controls='vertical-tabpanel-1'/>
                </Tabs>
                <div style={{display:imageOrAvatar===0?undefined:'none'}}>
                  <ImageCompactField
                    name={name+'_img'}
                    width={150}
                    height={150}
                    onChange={handleOnChange}
                    error={error}
                    otherProps={otherProps}
                    value={value}
                    readOnly={readOnly}
                  />
                </div>
              <div style={{display:imageOrAvatar===1?undefined:'none'}}>
                  <AvatarGeneratorField
                      name={name+'_avt'}
                    onChange={handleOnChange}
                    error={error}
                    otherProps={otherProps}
                    value={value}
                    readOnly={readOnly}
                  />
                </div>
        </div> ) : null}
      </div>
    );
}
