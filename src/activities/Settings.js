import React, { Component } from 'react';
import { ScrollView, View, Button } from 'react-native';
import { Header } from '../components'
import { List, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { logout } from '../actions';

class Settings extends Component {

  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header 
					left={{icon: 'arrow-left', onPress: () => this.props.navigation.goBack()}} 
					title='Setting'/>
        <ScrollView>
          <List>
            <ListItem
              title="Notifications"
            />
            <ListItem
              title="Profile"
            />
            <ListItem
              title="Password"
            />
          </List>
          <List>
            <ListItem
              title="Keluar"
              rightIcon={{ name: 'cancel'}}
              onPress={ this.handleLogout.bind(this) }
            />
          </List>
        </ScrollView>
      </View>
      
    );
  }
}

export default connect(null, { logout })(Settings);