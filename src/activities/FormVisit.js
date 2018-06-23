import React, { Component } from 'react';
import Navigator from '../services/Navigation'
import { reduxForm, Field } from 'redux-form';
import { Button, Input, TranslucentHeader } from "../components";
import * as Theme from "../constant/Theme";
import { ScrollView, KeyboardAvoidingView, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {isNotEmpty } from '../validator';

class FormVisit extends Component {
  render() {
  	const { valid, pristine } = this.props;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'} >
				<KeyboardAvoidingView behavior='padding'>
					<StatusBar 
						backgroundColor={Theme.TRANSLUCENCY}
						translucent={true}/>
					<TranslucentHeader 
						title="Pengajuan Kunjungan"
						onPress={()=>Navigator.navigate('Login')}/>
						<View style = {styles.container1}>
							<Text>{this.props.fullname}</Text>
	          				<Text>{this.props.email}</Text>
	          				<Text>{this.props.nik}</Text>
	          				<Text>{this.props.nohp}</Text>
	          			</View>
					<Field
						name='ktp'
						component={Input}
						icon="account"
						placeholder="Foto KTP"
						returnKeyType="next"
						onSubmitEditing={()=>this.passwordInput.focus()}
						getRef={(ref)=>this.emailInput = ref}
					/>
					<Field
						name='suratizin'
						component={Input}
						icon="account-card-details"
						placeholder="Foto Surat Izin"
						secureTextEntry
						returnKeyType="next"
						onSubmitEditing={()=>this.alamatInput.focus()}
						getRef={(ref)=>this.passwordInput = ref}
					/>
					<Button 
						isLoading={this.props.loading}
						isValid={valid && !pristine}>
						<Text>Ajukan Kunjungan</Text>
					</Button>
				</KeyboardAvoidingView>
			</ScrollView>
    );
  }
}
const styles = {
container1: {
    height: 150,
    backgroundColor: Theme.COLORED_BACKGROUND+'CC',
    paddingTop: Theme.STATUS_BAR_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  container: {
		flex: 1,
		backgroundColor: Theme.COLORED_BACKGROUND,
		padding: 16
	}
}

VisittForm =  reduxForm({
	form: 'FormVisit',
	validate: (values) => {
		const errors = {};
		errors.ktp = isNotEmpty(values.ktp);
		errors.suratizin = isNotEmpty(values.suratizin);
		return errors;
	}
})(FormVisit);

const mapStateToProps = ({auth}) => {
  const { fullname, email, nik, nohp } = {fullname: 'John Doe', email:'johnkdoe@gmail.com', nik : '090909090909', nohp: '08212121212'};

  return { fullname, email, nik, nohp };
};


export default connect(mapStateToProps, null)(VisittForm);


