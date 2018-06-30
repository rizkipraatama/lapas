import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import * as Theme from "../constant/Theme";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ButtonGroup extends Component {

  constructor(props){
    super(props);
    this.renderButton.bind(this);
    this.handlePress.bind(this);
  }

  handlePress(value){
    this.props.input.onChange(value);
  }
  
  renderButton() {
    const { input, buttons = [] } = this.props;

    return buttons.map(b => {
      backgroundColor = input.value == b.value ? Theme.PRIMARY_COLOR : null;
      return (
        <TouchableOpacity
          key={b.value}
          onPress={() => { this.handlePress(b.value) }} 
          style={[styles.buttonStyle, {backgroundColor}]}>
          <Text style={styles.buttonTextStyle}>{b.title}</Text>
        </TouchableOpacity>
      );
    })
  }

  render(){
    const { icon } = this.props;
    return (
      <View style={styles.containerStyle}>
        <Icon name={icon} size={24} color="#333" style={styles.iconStyle}/>
        { this.renderButton() }
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor:'#FFFFFF33',
    borderRadius: 25,
    flexDirection: 'row',
    marginBottom: 16,
    height: 46,
    overflow: 'hidden',
  }, 
  buttonStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: '#fff'
  },
  iconStyle: {
    alignSelf: 'center',
    paddingLeft: 16,
    paddingRight: 10,
  }
};

export { ButtonGroup };