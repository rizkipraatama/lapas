import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '../components'
import { Tile, List, ListItem, Button } from 'react-native-elements';

import { connect } from 'react-redux';

class Profile extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header 
					left={{icon: 'menu', onPress: () => this.props.navigation.openDrawer()}} 
					title='Profile'/>
        <ScrollView>
          <Tile
            featured
            title={this.props.name}
            caption={this.props.nik}
          />

          <Button
            title="Settings"
            buttonStyle={{ marginTop: 20 }}
            onPress={() => { this.props.navigation.navigate('Settings') }}
          />

          <List>
            <ListItem
              title="Email"
              rightTitle={this.props.email}
              hideChevron
            />
            <ListItem
              title="Phone"
              rightTitle={this.props.nohp}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Email"
              rightTitle={this.props.email}
              hideChevron
            />
            <ListItem
              title="NIK"
              rightTitle={this.props.nik}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Lokasi"
              rightTitle={this.props.alamat}
              hideChevron
            />
          </List>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
	const { username, name, email, nik, nohp, alamat } = auth.user;
	return { username, name, email, nik, nohp, alamat };
}

export default connect(mapStateToProps, {})(Profile);