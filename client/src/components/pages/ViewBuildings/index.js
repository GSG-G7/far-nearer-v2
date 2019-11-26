import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import { Navbar, Loading } from 'components/utils';
import buildingContext from 'contexts/buildingContext';

import styles from './view.module.css';

const MapComponent = lazy(() => import('./Map'));
const TableInfo = lazy(() => import('./Table'));

const viewBuildings = ({ history: { push } }) => {
  return (
    <buildingContext.Consumer>
      {context => {
        const { buildingInfo } = context;
        return (
          <>
            <Navbar />
            <div className="container" id="view">
              <div className={styles.view}>
                <h1 className={styles.heading}>View Buildings</h1>
                <p className={styles.content}>
                  These buildings have been reported as empty or at risk by the
                  community. Some may be in the process of verification.
                </p>
              </div>
              <Suspense fallback={<Loading />}>
                <MapComponent buildingInfo={buildingInfo} />
              </Suspense>
              <div className={styles.table}>
                <Suspense fallback={<Loading />}>
                  <TableInfo buildingInfo={buildingInfo} redirect={push} />
                </Suspense>
              </div>
            </div>
          </>
        );
      }}
    </buildingContext.Consumer>
  );
};

viewBuildings.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default viewBuildings;
