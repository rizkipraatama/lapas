import React from 'react';
import { Login, Utama, Register } from "./src/activities";
import { createStackNavigator  } from 'react-navigation';

import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Navigation from './src/services/Navigation';

export default class App extends React.Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <StackNav 
          ref={navigatorRef => {Navigation.setTopLevelNavigator(navigatorRef)}}/>
      </Provider>
    );
  }
}

const StackNav = createStackNavigator({
  Login, Register, Utama,
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
});