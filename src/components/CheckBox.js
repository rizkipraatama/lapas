import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { CheckBox as ElementsCheckBox } from 'react-native-elements';
import * as Theme from "../constant/Theme";

class CheckBox extends Component {

  constructor(props){
    super(props);
    this.handlePress.bind(this);
  }

  handlePress(){
    const {value} = this.props.input;
    this.props.input.onChange(!value);
  }

  render(){
    const { input, title } = this.props;
    return (
      <ElementsCheckBox 
        title={title}
        checked={input.value}
        onPress={() => {this.handlePress()}}
      />
    );
  }
}

const styles = {};

export { CheckBox };