import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, Image} from 'react-native';
import * as Theme from "../constant/Theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from 'react-native-image-crop-picker';

class ImageInput extends Component {
  isShowingError(meta){
    return meta.touched && meta.error;
  }

  handlePicker(){
    this.props.input.onFocus();
		ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
      mediaType: 'photo',
      includeBase64: true,
		}).then(image => {
      image.name = image.path.split('/').pop();
      this.props.input.onChange(image);
    }).catch(e => {

    }).finally(() => {
      this.props.input.onBlur();
    });
  }
  
  handleCamera(){
    this.props.input.onFocus();
		ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
		}).then(image => {
      image.name = image.path.split('/').pop();
      this.props.input.onChange(image);
    }).catch(e => {

    }).finally(() => {
      this.props.input.onBlur();
    });
	}

  render(){
    const { input, meta, icon, placeholder, getRef = () => {}, display = "flex" } = this.props;
    const showingError = this.isShowingError(meta);
    bC = showingError ? Theme.ERROR_COLOR : '';
    bW = showingError ? 1 : 0;
    return (
      <View style={containerStyle} borderWidth={bW} borderColor={bC} display={display}>
        <Icon name={icon} size={24} color="#333" style={styles.fieldIcon}/>
        <TextInput 
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value.name}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          ref={getRef}
          underlineColorAndroid = 'transparent'
          editable={false}
          display={input.value == ''? null : 'none'}
        />
        <Text style={errorText}>{showingError? meta.error: ''}</Text>
        {input.value? 
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: input.value.path}}/>
          </View> : null}
        <TouchableOpacity onPress={this.handlePicker.bind(this)} style={styles.buttonStyle}>
          <Icon name="file-image" size={24} color="#333"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleCamera.bind(this)} style={styles.buttonStyle}>
          <Icon name="camera" size={24} color="#333"/>
        </TouchableOpacity>
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
  },
  fieldIcon: {
    marginRight: 8,
  },
  buttonStyle: {
    marginLeft: 8,
  },
  imageContainer: {
    marginVertical: 8,
    borderRadius: 10,
    flexGrow: 1,
    backgroundColor: '#00000033'
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  }
};
const { inputStyle, containerStyle, errorText } = styles;

export { ImageInput };