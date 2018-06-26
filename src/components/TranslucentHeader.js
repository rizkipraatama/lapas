import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Theme from "../constant/Theme";

const TranslucentHeader = ({ title, onPress, icon="close" }) => {
  const {buttonStyle, containerStyle, titleStyle} = styles;
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Icon name={icon} size={36} color="#333"/>
      </TouchableOpacity>
      <Text style={titleStyle}>{title}</Text>
    </View>

  );
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  buttonStyle: {
    marginRight: 16
  },
  titleStyle: {
    fontSize: Theme.TITLE_SIZE,
  }
};

export { TranslucentHeader };