import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Theme from "../constant/Theme";

const Button = ({ onPress, children, isLoading, isValid }) => {
  loading.bind(this);
  idle.bind(this);
  disable.bind(this);  
  enable.bind(this);

  if (isLoading) loading();
  else idle();

  if(!isValid) disable();
  else enable();
   
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} disabled={disabled}>
      <ActivityIndicator color="#FFF" style={spinnerStyle} display={display}/>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

function disable(){
  disabled = true;
  buttonStyle.backgroundColor = Theme.PRIMARY_COLOR_DISABLED;
}

function enable(){
  disabled = false;
  buttonStyle.backgroundColor = Theme.PRIMARY_COLOR;
}

function loading(){
  disable();
  children = 'Tunggu'
  display = 'flex';
}

function idle(){
  enable()
  display = 'none';
}

const styles = {
  textStyle: {
    textAlign:'center',
    color :'#FFF',
    fontSize: 15,
  },
  buttonStyle: {
    backgroundColor: Theme.PRIMARY_COLOR,
    paddingVertical: 13,
    borderRadius: 25,
    paddingHorizontal:16,
    marginBottom: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  spinnerStyle: {
    marginRight: 4,
  }
};
const { buttonStyle, textStyle, spinnerStyle } = styles;

export { Button };