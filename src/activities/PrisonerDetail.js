import React, { Component } from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import { Header } from '../components'
import { Tile, List, ListItem } from 'react-native-elements';

class PrisonerDetail extends Component {
  render() {
    const { index, tipe, picture, name, email, phone, login, dob, location } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <Header 
					left={{icon: 'arrow-left', onPress: () => this.props.navigation.goBack()}} 
					title={name.first.toUpperCase()}/>
        <ScrollView>
          <Tile
            imageSrc={{ uri: picture.large}}
            featured
            title={`${name.first.toUpperCase()} ${name.last.toUpperCase()}`}
            caption={`${tipe}`}
          />

          <List>
            <ListItem
              title="Email"
              rightTitle={email}
              hideChevron
            />
            <ListItem
              title="Phone"
              rightTitle={phone}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Username"
              rightTitle={login.username}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Birthday"
              rightTitle={dob}
              hideChevron
            />
            <ListItem
              title="City"
              rightTitle={location.city}
              hideChevron
            />
          </List>
          <Button
          title="Ajukan Kunjungan"
            onPress={()=>this.props.navigation.navigate('FormVisit1', { index })}></Button>        
          </ScrollView>
      </View>
      
    );
  }
}

export default PrisonerDetail;