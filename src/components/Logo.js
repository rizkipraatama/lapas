import React from 'react';
import { View, Image, Text } from 'react-native';

import * as Theme from "../constant/Theme";

const Logo = ({ title, source }) => {
  const { containerStyle, logoStyle, titleStyle } = styles;
  return (
    <View style={containerStyle}>
      <Image style={logoStyle} source={source}/>
      <Text style={titleStyle}>{title}</Text> 
    </View>
  );
}

const styles = {
  containerStyle: {
    alignItems: 'center',
    justifyContent:'center',
    flexGrow: 1,
  },
  logoStyle: {
    height : 100,
    width: 100,
    resizeMode: 'stretch',
  },
  titleStyle: {
    color :'#000',
    marginTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: Theme.TITLE_SIZE
  }
};

export { Logo };