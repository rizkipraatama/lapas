import React, { Component } from 'react';
import { Picker as AndroidPicker, View, Text } from 'react-native';
import * as Theme from "../constant/Theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Picker extends Component {
  isShowingError(meta){
    return meta.touched && meta.error;
  }

  handleChange(itemValue, itemIndex){
    this.props.input.onFocus();
    this.props.input.onChange(itemValue);
    this.props.input.onBlur();
  }

  render(){
    const { input, meta, icon, placeholder, item} = this.props;
    const showingError = false && this.isShowingError(meta);
    bC = showingError ? Theme.ERROR_COLOR : null;
    bW = showingError ? 1 : 0;
    return (
      <View style={styles.container} borderWidth={bW} borderColor={bC}>
        <Icon name={icon} size={24} color="#333" style={styles.icon}/>
        <AndroidPicker
          selectedValue={input.value}
          style={styles.pickerContainer}
          onValueChange={this.handleChange.bind(this)}>
          <AndroidPicker.Item label={placeholder} value=""/>
          {item.map((i) => {
            return(
              <AndroidPicker.Item key={i.value} label={i.label} value={i.value} />
            );
          })}
        </AndroidPicker>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor:'#FFFFFF33',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginBottom: 16
  },
  pickerContainer: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 10
  },
  errorText: {
    color: Theme.ERROR_COLOR,
  },
};

export { Picker };