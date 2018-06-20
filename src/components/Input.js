import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import * as Theme from "../constant/Theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Input extends Component {
  constructor(props){
    super(props);
  }

  isShowingError(meta){
    return meta.touched && meta.error;
  }

  render(){
    const { input, meta, icon, onSubmitEditing, placeholder, secureTextEntry, returnKeyType, getRef} = this.props;
    const showingError = this.isShowingError(meta);
    bC = showingError ? Theme.ERROR_COLOR : '';
    bW = showingError ? 1 : 0;
    return (
      <View style={containerStyle} borderWidth={bW} borderColor={bC}>
        <Icon name={icon} size={24} color="#333"/>
        <TextInput 
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          ref={(r)=>{ if (typeof getRef == 'function') getRef(r)}}
          underlineColorAndroid = 'transparent'
        />
        <Text style={errorText}>{showingError? meta.error: ''}</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor:'#FFFFFF33',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16
  }, 
  inputStyle: {
    paddingLeft: 10,
    fontSize:16,
    lineHeight: 23,
    flex: 1
  },
  errorText: {
    color: Theme.ERROR_COLOR,
  }
};
const { inputStyle, containerStyle, errorText } = styles;

export { Input };