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
            title={`${this.props.name.first.toUpperCase()} ${this.props.name.last.toUpperCase()}`}
            caption={this.props.email}
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
              rightTitle={this.props.phone}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Username"
              rightTitle={this.props.login.username}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Birthday"
              rightTitle={this.props.dob}
              hideChevron
            />
            <ListItem
              title="City"
              rightTitle={this.props.location.city}
              hideChevron
            />
          </List>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
	const { name, email, phone, login, dob, location } = auth.user;
	return { name, email, phone, login, dob, location };
}

export default connect(mapStateToProps, {})(Profile);