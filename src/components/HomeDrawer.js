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
          <Text style={styles.fullname}>{this.props.nama}</Text>
          <Text style={styles.nik}>{`NIK: ${this.props.nik}`}</Text>
          <Text style={styles.nohp}>{this.props.telepon}</Text>
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
  nik: {
    fontSize: Theme.SUBTITLE2,
    color: '#fff'
  },
  nohp: {
    fontSize: Theme.CAPTION,
    color: '#fff'
  }
}

const mapStateToProps = ({auth}) => {
  const { nama, nik, telepon } = auth.user;

  return { nama, nik, telepon };
};

HomeDrawer =  connect(mapStateToProps, null)(HomeDrawer);
export { HomeDrawer };