import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GOOGLE_API_KEY} from '../../google-api-key';

class MapContainer extends Component {
    static defaultProps = {
        initialCenter: {
            lat: 32.109333,
            lng: 34.855499
        },
        zoom: 10,
        coordinatesFromMap: () => {}
    };
    state = {
        activeMarker: null,
        showInfoWindow: false
    }

    onMarkerClick = (props, activeMarker, e)=>{
        if(this.props.viewing){
            this.setState({showInfoWindow: true, activeMarker});
        } else {
            let showInfoWindow = !this.state.showInfoWindow;
            this.setState({showInfoWindow, activeMarker});
        }
    }
    onMapClick = (mapProps, map, e)=>{
        if(!this.props.viewing){
            const position = e.latLng;
            this.props.coordinatesFromMap(position.lat(), position.lng());
        }
    }
    onInfoWindowClose = () => {
        this.setState({showInfoWindow: false});
    }

    render() {
        const style = {width: '100%', height: '100%'};
        let {name, initialCenter, zoom, marker, viewing, google} = this.props;
        let markerName = name;
        const {activeMarker} = this.state;
        if(viewing){
            marker = marker.map(({position, name})=> {
                const icon = (name === markerName) ? {
                    url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
                    anchor: new google.maps.Point(21,43),
                    scaledSize: new google.maps.Size(43,43)
                } : undefined;
                return <Marker icon={icon} key={name} onClick={this.onMarkerClick} name={name} position={position} />
            });
            markerName = activeMarker ? activeMarker.name : markerName;
        } else {
            const position = marker;
            if (position) initialCenter = position;
            marker = position ? <Marker onClick={this.onMarkerClick} name={name} position={position} /> : null;
        }
        return (<Map style={style} google={google} zoom={zoom} onClick={this.onMapClick} initialCenter={initialCenter} >
                {marker}

                <InfoWindow visible={this.state.showInfoWindow} onClose={this.onInfoWindowClose} marker={this.state.activeMarker}>
                    <div>
                        <h4>{markerName}</h4>
                    </div>
                </InfoWindow>
            </Map>);
    }
}
 
export default GoogleApiWrapper({
    apiKey: (GOOGLE_API_KEY)
})(MapContainer);
