import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Theme from "../constant/Theme";

const ActivityFiller = ({ icon, title, loading }) => {
  return (
    <View style={styles.containerStyle}>
      { loading ? <ActivityIndicator size={56} color={Theme.COLORED_BACKGROUND} /> :
        <View>
          <Icon style={styles.icon} name={icon} size={56}/>
          <Text style={styles.title}>{title}</Text>
        </View>
      }

    </View>
  );
}

const styles = {
  containerStyle: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: -Theme.HEADER_HEIGHT + Theme.STATUS_BAR_HEIGHT
  },
  icon: {
    textAlign: 'center'
  },
  title: {
    fontSize: Theme.SUBTITLE2,
    marginTop: 8,
    textAlign: 'center'
  }
};

export { ActivityFiller };