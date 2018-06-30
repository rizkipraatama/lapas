import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Navigator from './src/services/Navigation';
import Routes from './src/routes';

import Reactotron, { asyncStorage, networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  render() {
    //const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    Reactotron
      .configure({ name: 'Lapas' })
      .use(reactotronRedux())
      .use(asyncStorage())
      .use(networking())
      .connect();
    
    console.tron = Reactotron;
  
    if (__DEV__){
      store = Reactotron.createStore(reducers, {}, compose(applyMiddleware(ReduxThunk)));
    } else {
      store = createStore(reducers, {}, compose(applyMiddleware(ReduxThunk)));
    }

    return (
      <Provider store={store}>
        <Routes
          ref={navigatorRef => {Navigator.setTopLevelNavigator(navigatorRef)}}/>
      </Provider>
    );
  }
}