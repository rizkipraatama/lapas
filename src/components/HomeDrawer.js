import React, {Component} from 'react';
import Navigator from "../services/Navigation";
import { ScrollView, Text, View } from 'react-native';
import { DrawerItems } from 'react-navigation';

import { connect } from 'react-redux';

import * as Theme from '../constant/Theme';

class HomeDrawer extends Component {

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.fullname}>{this.props.fullname}</Text>
          <Text style={styles.email}>{this.props.email}</Text>
        </View>
        <DrawerItems {...this.props}/>
      </View>
    );
  }
}

const styles = {
  container: {
    height: 150,
    backgroundColor: Theme.COLORED_BACKGROUND+'CC',
    paddingTop: Theme.STATUS_BAR_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 16,

  },
  fullname: {
    fontSize: Theme.H6,
    color: '#fff'
  },
  email: {
    fontSize: Theme.SUBTITLE1,
    color: '#fff'
  }
}

const mapStateToProps = ({auth}) => {
  const { fullname, email } = {fullname: 'John Doe', email:'johnkdoe@gmail.com'};

  return { fullname, email };
};

HomeDrawer =  connect(mapStateToProps, null)(HomeDrawer);
export { HomeDrawer };