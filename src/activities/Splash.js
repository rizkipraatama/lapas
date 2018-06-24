import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Logo } from '../components';
import * as Theme from '../constant/Theme';
import { connect } from 'react-redux';
import { gettingAuth } from '../actions';


class Splash extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount(){
		this.props.gettingAuth();
  }
  
  render(){
    return (
      <View style={styles.container}>
        <StatusBar 
					backgroundColor={Theme.TRANSLUCENCY}
					translucent={true}/>
				<Logo 
					source={require('../../assets/image/Logo_Lapas.png')} 
					title="Info Lapas"/>
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