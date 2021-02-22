import React from "react";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import AvatarGeneratorField from "/imports/ui/components/SimpleFormFields/AvatarGeneratorField/AvatarGeneratorField";
import ImageCompactField from "/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField";

import Button from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';
import Divider from '@material-ui/core/Divider';

import Fab from "@material-ui/core/Fab";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {imageOrAvatarStyle} from "./ImageOrAvatarFieldStyle";
import {hasValue} from "/imports/libs/hasValue";
import {isMobile} from "/imports/libs/deviceVerify";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

export default ({name, label, value, onChange, readOnly, error, ...otherProps}:IBaseSimpleFormComponent)=>{

  const [imageOrAvatar, setImageOrAvatar] = React.useState(0);

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

    {!!readOnly ?
         (<div key={name} id={name}>
          <SimpleLabelView label={label}/>
          {hasValue(value) && value!='' && value!='-' ?
            <div key={name} id={name}>
                    <div style={{
                        height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                        transform: (window.innerWidth) < 901 ? `scale(${((window.innerWidth -
                            (isMobile ? 44 : 130)) / 900)})` : undefined,
                        transformOrigin: (window.innerWidth) < 901 ? '0 0' : undefined,
                    }}>
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
            </div> : ( !!readOnly ? <div style={imageOrAvatarStyle.containerEmptyMidia}>{'Não há mídia'}</div>: null)
          }
        </div>) : null
    }

    return (
      <div key={name} style={error? imageOrAvatarStyle.containerImageOrAvatarError:imageOrAvatarStyle.containerImageOrAvatar}>
        <SimpleLabelView label={label}/>
          <div style={imageOrAvatarStyle.containerImageOrAvatarButton}>
              <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={imageOrAvatar}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  style={imageOrAvatarStyle.tabs}
                >
                  <Tab label="Imagem Zoom+Slider" id='vertical-tab-0' aria-controls='vertical-tabpanel-0'/>
                  <Tab label="Avatar" id='vertical-tab-1' aria-controls='vertical-tabpanel-1'/>
                </Tabs>
                <TabPanel value={imageOrAvatar} index={0}>
                  <ImageCompactField
                    name={name}
                    onChange={onChange}
                    error={error}
                    otherProps={otherProps}
                    value={value}
                    readOnly={readOnly}
                  />
                </TabPanel>
                <TabPanel value={imageOrAvatar} index={1}>
                  <AvatarGeneratorField
                    name={name}
                    onChange={onChange}
                    error={error}
                    otherProps={otherProps}
                    value={value}
                    readOnly={readOnly}
                  />
                </TabPanel>
        </div>
      </div>
    )
}
