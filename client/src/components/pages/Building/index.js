import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, Loading } from 'components/utils';
import buildingContext from 'contexts/buildingContext';

import styles from './building.module.css';

const Building = props => {
  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  return (
    <buildingContext.Consumer>
      {context => {
        const { buildingInfo, loading } = context;
        if (loading) {
          return <Loading />;
        }
        const found = buildingInfo.find(building => {
          return id === building.id;
        });
        if (found) {
          const {
            city,
            emptyPeriod,
            extraInfo,
            isOwnerLocal,
            knownAddress,
            location,
            owner,
            previousUse,
            thumbnail,
          } = found;
          return (
            <div>
              <Navbar />
              <div className={styles.building}>
                <img
                  src={`/${thumbnail}`}
                  alt={city}
                  className={styles.image}
                />
                <h1 className={styles.city}>
                  {city}{' '}
                  <span className={styles.emptyPeriod}>
                    Empty since: {emptyPeriod}
                  </span>
                </h1>
                <h1>Location: {location}</h1>
                {knownAddress !== 'N/A' ? <span>{knownAddress}</span> : ''}
                <h1>Owner: {owner}</h1>
                {isOwnerLocal !== 'N/A' ? <span>{isOwnerLocal}</span> : ''}
                <h1>previous Use: {previousUse}</h1>
                <h1>Other information: {extraInfo}</h1>
              </div>
            </div>
          );
        }
        push('/404');
      }}
    </buildingContext.Consumer>
  );
};

Building.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Building;
