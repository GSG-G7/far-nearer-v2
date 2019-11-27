import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd';

import 'antd/dist/antd.css';
import './style.css';

import { Footer } from 'components/utils';
import About from 'components/pages/AboutUs';
import Error from 'components/pages/Error';
import ViewBuildings from 'components/pages/ViewBuildings';
import Home from 'components/pages/Home';
import Building from 'components/pages/Building';

import buildingContext from 'contexts/buildingContext';
import SignUp from 'components/pages/SignUp';

class App extends Component {
  state = {
    buildingInfo: [],
    loading: true,
  };

  async componentDidMount() {
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
        this.setState({ buildingInfo: data, loading: false });
      else this.setState({ loading: false });
    } catch (err) {
      openNotificationWithIcon(
        'error',
        'Something went wrong! Please try again',
      );
    }
  }

  render() {
    return (
      <buildingContext.Provider value={{ ...this.state }}>
        <Router>
          <Switch>
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/view-buildings" component={ViewBuildings} />
            <Route exact path="/view-buildings/:id" component={Building} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </Router>
      </buildingContext.Provider>
    );
  }
}

export default App;
