import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import * as Theme from '../constant/Theme';
import { connect } from 'react-redux';
import { gettingAuth } from '../actions';


class Splash extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount(){
    this.props.gettingAuth().then(()=> {
      SplashScreen.hide();  
    });
  }

  
  render(){
    return (
      <View style={styles.container}>
        <StatusBar 
					backgroundColor={Theme.TRANSLUCENCY}
					translucent={true}/>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: Theme.COLORED_BACKGROUND,
    flexGrow: 1,
  }
}
export default connect(null, { gettingAuth })(Splash);