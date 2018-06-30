import React, { Component } from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import { Header } from '../components'
import { Tile, List, ListItem } from 'react-native-elements';

class PrisonerDetail extends Component {
  render() {
    const { index, prisoner } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <Header 
					left={{icon: 'arrow-left', onPress: () => this.props.navigation.goBack()}} 
					title={prisoner.nama.toUpperCase()}/>
        <ScrollView>
          <Tile
            featured
            title={`${prisoner.nama}`}
            caption={`${prisoner.pasal} - ${prisoner.status[0].toUpperCase() + prisoner.status.slice(1)}`}
          />

          <List>
            <ListItem
              title="ID"
              rightTitle={prisoner.id}
              hideChevron
            />
            <ListItem
              title="No Instansi"
              rightTitle={prisoner.no_instansi}
              hideChevron
            />
            <ListItem
              title="Alias"
              rightTitle={prisoner.alias}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Hukuman"
              rightTitle={prisoner.hukuman}
              hideChevron
            />
          </List>
          
          <List>
            <ListItem
              title="Tanggal Masuk"
              rightTitle={prisoner.tanggal_masuk}
              hideChevron
            />
            <ListItem
              title="Tanggal Keluar"
              rightTitle={prisoner.tanggal_keluar}
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