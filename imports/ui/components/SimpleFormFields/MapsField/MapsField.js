// eslint-disable-next-line
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import FormGroup from "@material-ui/core/FormGroup";
import settings from '/settings.json'


const styles = theme => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: theme.spacing(1) / 4,
        },
    };
};

class LocationComponent extends React.Component {

    handleMapClick = (mapProps, map, clickEvent) => {
        const{name}= this.props
        if (!this.props.readOnly) {
            const newPosition = {
                lat: clickEvent.latLng.lat(),
                lng: clickEvent.latLng.lng(),
            };

            this.props.onChange({},{
                name,
                value: {position: newPosition,
                }
            });
        }
    };

    render() {
        return (
            <div style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                <FormGroup
                    error={this.props.error}
                    style={{ width: '100%', height: 400, padding: 0, margin: 0 }}
                >
                    {this.props.label ? (
                        <InputLabel htmlFor="select-multiple-chip">
                            {this.props.label}
                        </InputLabel>
                    ) : null}
                    <div pt={this.props.label ? 50 : 0}
                         style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column', margin: 0 }}>
                        <Map
                            containerStyle={{height:350,width:'calc(100% - 50px)'}}
                            style={{ height: 350,width:'calc(100% - 50px)' }}
                            google={this.props.google}
                            initialCenter={this.props.value.position ? this.props.value.position : {
                                lat: -19.9051,
                                lng: -43.9445,
                            }}
                            zoom={12}
                            onClick={this.handleMapClick}
                        >
                            {this.props.value.position && this.props.value.position.lat && this.props.value.position.lng ?
                                <Marker
                                    name={'Location'}
                                    position={this.props.value.position}
                                />
                                : null}
                        </Map>

                    </div>
                </FormGroup>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: settings&&settings.maps?settings.maps.api: '',
    libraries: [ 'visualization' ],
})(withStyles(styles)(LocationComponent));

