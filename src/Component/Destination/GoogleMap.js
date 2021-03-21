import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const GoogleMap = () => {
    return (
        <div>
             <Map google={this.props.google} zoom={14}>
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
                </Map>
        </div>
    );
};


export default GoogleApiWrapper({
    apiKey: ("AIzaSyDAOXNh7FWVRQRjBI0i3BD9_0TPh7Iyyu8")
  })(GoogleMap)