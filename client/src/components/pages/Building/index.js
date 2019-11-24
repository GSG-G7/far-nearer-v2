import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

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
              <div className={`container ${styles.building}`}>
                <h1 className={styles.city}>{city}</h1>

                <img
                  src={`/${thumbnail}`}
                  alt={city}
                  className={styles.image}
                />
                <h3 className={styles.location}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 23 23"
                    >
                      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                    </svg>
                  </span>
                  {location}
                  {knownAddress !== 'N/A' ? (
                    <p className={styles.knownAddress}>{knownAddress}</p>
                  ) : null}
                </h3>
                <div className={styles.content}>
                  <div className={styles.left__side}>
                    <h2 className={styles.title}>Owner</h2>
                    <p className={styles.description}>
                      {owner}{' '}
                      {isOwnerLocal.toLowerCase() === 'yes' ? (
                        <Tag className={styles.ownerLocal__active}>
                          Local Owner
                        </Tag>
                      ) : null}
                    </p>

                    <h2 className={styles.title}>previous Use </h2>
                    <p className={styles.description}>{previousUse}</p>
                  </div>

                  <div className={styles.right__side}>
                    <h2 className={styles.title}>Other information </h2>
                    <p className={styles.description}>{extraInfo}</p>

                    <h2 className={styles.title}>
                      Empty Since{' '}
                      <span className={styles.description}>{emptyPeriod}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return push('/404');
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
