import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import FormGroup from "@material-ui/core/FormGroup";
import settings from '/settings.json'
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import styles from './MapsFieldStyles'


const stylesWrap = (theme:any) => {
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

class LocationComponent extends React.Component<IBaseSimpleFormComponent> {

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
            <div style={styles.container}>
                <FormGroup
                    error={this.props.error}
                    style={styles.formContainer}
                >
                    {this.props.label ? (
                        <SimpleLabelView style={styles.labelTitle} label={this.props.label}/>
                    ) : null}
                    <div style={styles.mapContainer}>
                        <Map
                            containerStyle={styles.mapContainer2}
                            style={styles.map}
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
})(withStyles(stylesWrap)(LocationComponent));

