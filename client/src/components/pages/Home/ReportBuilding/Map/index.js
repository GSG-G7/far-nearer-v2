import React from 'react';
import {
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  Polygon,
} from 'react-leaflet';

import PropTypes from 'prop-types';

import { Morecambe, Hastings } from './cityBounds.json';
import styles from './map.module.css';

const Map = props => {
  const createMarker = (latlng, location) => (
    <Marker position={latlng}>
      <Popup className={styles.popup}>{location}</Popup>
    </Marker>
  );
  const { city, onCityClick, markerCoordinates, location } = props;
  const cityBoundary = city === 'Morecambe' ? Morecambe : Hastings;
  const zoom = city === 'Morecambe' ? 13 : 12;
  return (
    <div className={styles.map}>
      <LeafletMap
        className={styles.map}
        center={[51.505, -0.09]}
        zoom={zoom}
        maxBounds={cityBoundary}
      >
        <TileLayer
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id="mapbox.streets"
          accessToken="pk.eyJ1IjoiZmFkeW1hemVuIiwiYSI6ImNrMXRxY3JjZDBpMGYzbXF5YmV0c2g5a24ifQ.C6ZZQF61IMwDVQmu7Xxpzg"
        />
        <Polygon
          positions={cityBoundary}
          fillOpacity={0}
          onclick={onCityClick}
        />
        {markerCoordinates &&
          markerCoordinates.lat &&
          markerCoordinates.lng &&
          createMarker(markerCoordinates, location)}
      </LeafletMap>
    </div>
  );
};

Map.propTypes = {
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  location: PropTypes.string,
  markerCoordinates: PropTypes.objectOf(PropTypes.number),
};

Map.defaultProps = {
  markerCoordinates: undefined,
  location: undefined,
};

export default Map;
