import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Navigator from './src/services/Navigation';
import Routes from './src/routes';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <Routes
          ref={navigatorRef => {Navigator.setTopLevelNavigator(navigatorRef)}}/>
      </Provider>
    );
  }
}