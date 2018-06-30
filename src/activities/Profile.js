import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '../components'
import { Tile, List, ListItem, Button } from 'react-native-elements';

import { connect } from 'react-redux';
import { logout } from '../actions';

import * as Theme from '../constant/Theme';

class Profile extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header 
					left={{icon: 'menu', onPress: () => this.props.navigation.openDrawer()}} 
					title='Profile'/>
        <ScrollView>

          <List>
            <ListItem
              title="Username"
              rightTitle={this.props.user.username}
              hideChevron
            />         
          </List>

          <List>
            <ListItem
              title="Nama Lengkap"
              rightTitle={this.props.user.nama}
              hideChevron
            />    
            <ListItem
              title="NIK"
              rightTitle={this.props.user.nik}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Jenis Kelamin"
              rightTitle={this.props.user.jenis_kelamin}
              hideChevron
            />
            <ListItem
              title="Lokasi"
              rightTitle={this.props.user.alamat}
              hideChevron
            />
            <ListItem
              title="Phone"
              rightTitle={this.props.user.telepon}
              hideChevron
            />
          </List>

          <Button
            title="Perbaharui Profile"
            buttonStyle={{ marginTop: 20 }}
            backgroundColor={Theme.COLORED_BACKGROUND}
            onPress={() => { this.props.navigation.navigate('UpdateProfile') }}
          />

          <Button
            title="Ubah Password"
            buttonStyle={{ marginTop: 20 }}
            backgroundColor={Theme.COLORED_BACKGROUND}
            onPress={() => { this.props.navigation.navigate('UpdatePassword') }}
          />

          <Button
            title="Keluar"
            buttonStyle={{ marginTop: 20 }}
            backgroundColor={Theme.ERROR_COLOR}
            onPress={() => { this.props.logout(); }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
	return { user: auth.user };
}

export default connect(mapStateToProps, { logout })(Profile);