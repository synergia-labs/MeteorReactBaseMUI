import React from "react";
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';



class MapsField extends React.Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('dfgdsfgdhfdhsdfgsdf')
})(MapsField)