import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import styles from './view.module.css';

const buildMarkers = buildingInfo => {
  const buildings = buildingInfo.map(building => {
    const build = { ...building };
    build.position = [build.latitude, build.longitude];
    delete build.latitude;
    delete build.longitude;
    return build;
  });
  const markers = buildings.map(element => {
    const {
      id,
      position,
      thumbnail,
      city,
      location,
      previousUse,
      owner,
      emptyPeriod,
      isOwnerLocal,
      extraInfo,
      approved,
    } = element;
    return (
      <Marker position={position} key={id}>
        <Popup>
          <img
            src={`https://res.cloudinary.com/duzdjvsfs/image/upload/v1574616761/${thumbnail}`}
            alt="building"
            className={styles.building__img}
          />
          <div className={styles.popup__content}>
            <h2 className={styles.building__city}>
              {city}
              <span className={styles.ownerLocal}>
                {isOwnerLocal.toLowerCase() === 'yes' ? (
                  <Tag className={styles.ownerLocal__active}>Local Owner</Tag>
                ) : null}
              </span>
            </h2>

            <h4>
              <span className={styles.building__title}>Location:</span>
              {location}
            </h4>
            <h4>
              <span className={styles.building__title}>Previous Use: </span>
              {previousUse}
            </h4>
            <h4>
              <span className={styles.building__title}>Owner: </span> {owner}
            </h4>
            <h4>
              <span className={styles.building__title}>Empty Since: </span>
              {emptyPeriod}
            </h4>
            {extraInfo !== 'N/A' || !extraInfo ? (
              <h4>
                <span className={styles.building__title}>
                  Other Information:{' '}
                </span>
                <br />
                <div className={styles.building__extra}>{extraInfo}</div>
              </h4>
            ) : null}
            <h4>
              <span className={styles.approved}>
                {approved ? (
                  <Tag color="green">Approved</Tag>
                ) : (
                  <Tag color="red">Pending</Tag>
                )}
              </span>
            </h4>
          </div>
        </Popup>
      </Marker>
    );
  });
  return markers;
};

const MapComponent = ({ buildingInfo, view }) => {
  let center = [51.509865, -0.118092];
  let zoom = 6;
  let maxBounds = [
    { lat: 56.25501647203477, lng: -16.853027343750004 },
    { lat: 49.83994655735523, lng: -17.072753906250004 },
    { lat: 49.85410987531622, lng: 10.458984375000002 },
    { lat: 56.30379004315596, lng: 10.72265625 },
  ];
  if (view === 'oneBuilding') {
    switch (buildingInfo[0].city) {
      case 'Morecambe':
        center = [54.06933, -2.8631401];
        zoom = 14;
        maxBounds = [
          { lat: 54.07923285658608, lng: -2.835073471069336 },
          { lat: 54.07923285658608, lng: -2.8912067413330083 },
          { lat: 54.059427160261045, lng: -2.835073471069336 },
          { lat: 54.059427160261045, lng: -2.8912067413330083 },
        ];
        break;
      case 'Hastings':
        center = [50.868607, 0.581760405];
        zoom = 13;
        maxBounds = [
          { lat: 50.89178215788768, lng: 0.6509399414062501 },
          { lat: 50.89178215788768, lng: 0.5125808715820314 },
          { lat: 50.84543191993169, lng: 0.6509399414062501 },
          { lat: 50.84543191993169, lng: 0.5125808715820314 },
        ];
        break;
      default:
        break;
    }
  }
  return (
    <Map
      center={center}
      zoom={zoom}
      className={styles.map}
      maxBounds={maxBounds}
    >
      <TileLayer
        url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
        id="mapbox.streets"
        accessToken="pk.eyJ1IjoiZmFkeW1hemVuIiwiYSI6ImNrMXRxY3JjZDBpMGYzbXF5YmV0c2g5a24ifQ.C6ZZQF61IMwDVQmu7Xxpzg"
      />
      {buildingInfo && buildingInfo.length ? buildMarkers(buildingInfo) : null}
    </Map>
  );
};

MapComponent.propTypes = {
  buildingInfo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  view: PropTypes.string,
};

MapComponent.defaultProps = {
  buildingInfo: [],
  view: '',
};

export default MapComponent;
