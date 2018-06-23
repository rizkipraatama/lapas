import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Theme from "../constant/Theme";
import PropTypes from 'prop-types';


const Header = ({ left, title, right }) => {
  const {leftStyle, containerStyle, titleStyle, rightStyle} = styles;
  return (
    <View style={containerStyle}>
      {left?
        <TouchableOpacity onPress={left.onPress} style={leftStyle}>
          <Icon name={left.icon} size={28} color="#fff"/>
        </TouchableOpacity>
      : null}
      <Text style={titleStyle}>{title}</Text>
      {right?
        <TouchableOpacity onPress={right.onPress} style={rightStyle}>
        <Icon name={right.icon} size={28} color="#fff"/>
      </TouchableOpacity>
      : null}
    </View>
  );
}

Header.propTypes = {
  left: PropTypes.shape({
    icon: PropTypes.string,
    onPress: PropTypes.func,
  }),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  right: PropTypes.shape({
    icon: PropTypes.string,
    onPress: PropTypes.func,
  }),
}

const styles = {
  containerStyle: {
    height: Theme.HEADER_HEIGHT,
    backgroundColor: Theme.COLORED_BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
  },
  leftStyle: {
    marginLeft: 16,
    marginRight: 16,
  },
  titleStyle: {
    fontSize: Theme.H6,
    color: "#fff",
    flex: 1,
  },
  rightStyle: {
    marginLeft: 16,
    marginRight: 16,
  }
};

export { Header };