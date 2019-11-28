import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
import SignIn from 'components/pages/SignIn';

import buildingContext from 'contexts/buildingContext';

class App extends Component {
  state = {
    buildingInfo: null,
    loading: true,
    currentBuilding: null,
    isAuth: false,
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get('api/v1/is-auth');
      if (data.statusCode === 200) {
        this.setState({ isAuth: true });
      } else {
        this.setState({ isAuth: false });
      }
    } catch (error) {
      this.setState({ isAuth: false });
    }
  }

  getBuilding = async id => {
    const openNotificationWithIcon = (type, message) => {
      notification[type]({
        message,
        duration: 2,
      });
    };
    try {
      const {
        data: { data },
      } = await axios.get(`/api/v1/empty-buildings/${id}`);
      this.setState({ currentBuilding: data, loading: false });
    } catch (err) {
      openNotificationWithIcon(
        'error',
        'Something went wrong! Please try again',
      );
    }
  };

  updateAuth = () => {
    const { isAuth } = this.state;
    this.setState({ isAuth: !isAuth });
  };

  updateState = data => {
    this.setState(data);
  };

  logout = async () => {
    try {
      const { data } = await axios.get('/api/v1/logout');
      if (data.statusCode === 200) {
        this.setState({ isAuth: false });
      } else {
        this.setState({ isAuth: true });
      }
    } catch (error) {
      this.setState({ isAuth: true });
    }
  };

  render() {
    const { isAuth } = this.state;
    return (
      <buildingContext.Provider value={{ ...this.state, logout: this.logout }}>
        <Router>
          <Switch>
            <Route
              exact
              path="/sign-in"
              render={props =>
                isAuth ? (
                  <Redirect to="/" />
                ) : (
                  <SignIn {...props} updateAuth={this.updateAuth} />
                )
              }
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            {isAuth ? (
              <>
                <Route
                  exact
                  path="/view-buildings"
                  render={props => (
                    <ViewBuildings {...props} updateState={this.updateState} />
                  )}
                />
                <Route
                  exact
                  path="/view-buildings/:id"
                  render={props => (
                    <Building {...props} getBuilding={this.getBuilding} />
                  )}
                />
              </>
            ) : (
              <Route render={() => <Redirect to="/sign-in" />} />
            )}
            <Route component={Error} />
          </Switch>
          <Footer />
        </Router>
      </buildingContext.Provider>
    );
  }
}

export default App;
