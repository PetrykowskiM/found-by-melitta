import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import { ThemeProvider } from 'styled-components';

import './App.css';

//Components
import LandingScreen from './screens/LandingScreen'
import CountryScreen from './screens/CountryScreen'
import OrderScreen from './screens/OrderScreen'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      theme:{
        colors: {
          primary: '#e2031a',
          secondary: 'rgba(171, 171, 171, 0.55)'
        }
      },
      mapMoved: false,
      route: {
        name: 'landing',
        props: {}
      }
    }
  }

  mapMoves = () => {
    this.setState({
      mapMoved: true
    })
  }

  changeRoute(newRoute, props={}) {
    this.setState({
      route: {
        name: newRoute,
        props,
      }
    })
  }

  getChildContext() {
    return {
      changeRoute: (newRoute, props) => this.changeRoute(newRoute, props),
    };
  }

  renderScreen() {
    switch (this.state.route.name) {
      case 'start':
        return <LandingScreen {...this.state.route.props} />
      case 'country':
        return <CountryScreen {...this.state.route.props} />
      case 'order':
        return <OrderScreen {...this.state.route.props} />
      default:
        return <LandingScreen {...this.state.route.props} />
    }
  }

  render() {
    return (
      <ThemeProvider id="theme" theme={this.state.theme}>
      {
        this.renderScreen()
      }
      </ThemeProvider>
    );
  }
}

App.childContextTypes = {
  changeRoute: PropTypes.func
};

export default App;