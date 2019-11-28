import React, { lazy, Suspense, Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { notification } from 'antd';

import { Navbar, Loading } from 'components/utils';
import buildingContext from 'contexts/buildingContext';

import styles from './view.module.css';

const MapComponent = lazy(() => import('./Map'));
const TableInfo = lazy(() => import('./Table'));

class viewBuildings extends Component {
  async componentDidMount() {
    const { updateState } = this.props;
    const openNotificationWithIcon = (type, message) => {
      notification[type]({
        message,
        duration: 2,
      });
    };
    try {
      const {
        data: { data },
      } = await axios.get('/api/v1/empty-buildings');

      if (data && data[0] && data[0].latitude && data[0].longitude)
        updateState({ buildingInfo: data, loading: false });
      else updateState({ loading: false });
    } catch (err) {
      openNotificationWithIcon(
        'error',
        'Something went wrong! Please try again',
      );
    }
  }

  render() {
    const {
      history: { push },
    } = this.props;
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
                    These buildings have been reported as empty or at risk by
                    the community. Some may be in the process of verification.
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
  }
}

viewBuildings.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  updateState: PropTypes.func.isRequired,
};

export default viewBuildings;
