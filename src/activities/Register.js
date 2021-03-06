import React, {Component} from 'react';
import { ScrollView, KeyboardAvoidingView, StatusBar, Text } from 'react-native';
import { Button, Input, TranslucentHeader, ButtonGroup } from "../components";
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { isUsernameValid, isPasswordValid, isEmailValid, isNotEmpty, isNIK } from '../validator';
import { reduxForm, Field } from 'redux-form';

import * as Theme from "../constant/Theme";

class Register extends Component {

	constructor(props){
		super(props);
		this.props.initialize({ gender: 'L' });
	}

	render() {
		const { valid, pristine } = this.props;
		return (
			<ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'} >
				<KeyboardAvoidingView behavior='padding'>
					<StatusBar 
						backgroundColor={Theme.TRANSLUCENCY}
						translucent={true}/>
					<TranslucentHeader 
						title="Pendaftaran"
						onPress={()=>this.props.navigation.goBack()}/>
					<Field
						name="fullname"
						component={Input}
						icon="clipboard-account"
						placeholder="Nama Lengkap"
						returnKeyType="next"
						onSubmitEditing={()=>this.usernameInput.focus()}
					/>
					<Field
						name='username'
						component={Input}
						icon="account"
						placeholder="Username"
						returnKeyType="next"
						getRef={(ref)=>this.usernameInput = ref}
					/>
					<Field
						name='gender'
						component={ButtonGroup}
						icon={'gender-male-female'}
						buttons={[{title: 'Laki-laki', value: 'L'}, {title: 'Perempuan', value: 'P'}]}
					/>
					<Field
						name='password'
						component={Input}
						icon="key"
						placeholder="Kata Sandi"
						secureTextEntry
						returnKeyType="next"
						onSubmitEditing={()=>this.alamatInput.focus()}
						getRef={(ref)=>this.passwordInput = ref}
					/>
					<Field
						name='address'
						component={Input}
						icon="home"
						placeholder="Alamat Rumah"
						multiline
						returnKeyType="next"
						onSubmitEditing={()=>this.nikInput.focus()}
						getRef={(ref)=>this.alamatInput = ref}
					/>
					<Field
						name='nik'
						component={Input}
						icon="account-card-details"
						placeholder="NIK"
						returnKeyType="next"
						onSubmitEditing={()=>this.numberInput.focus()}
						getRef={(ref)=>this.nikInput = ref}
					/>
					<Field
						name='nohp'
						component={Input}
						icon="cellphone"
						placeholder="Nomor HP"
						returnKeyType="go"
						getRef={(ref)=>this.numberInput = ref}
					/>
					<Button 
						onPress={this.props.handleSubmit(createUser)}
						isLoading={this.props.loading}
						isValid={valid && !pristine}>
						<Text>Registrasi</Text>
					</Button>
				</KeyboardAvoidingView>
			</ScrollView>
			
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: Theme.COLORED_BACKGROUND,
		padding: 16
	},
}

RegisterForm =  reduxForm({
	form: 'Register',
	validate: (values) => {
		const errors = {};
		errors.fullname = isNotEmpty(values.fullname);
		errors.username = isUsernameValid(values.username);
		errors.password = isPasswordValid(values.password);
		errors.address = isNotEmpty(values.address);
		errors.nik = isNIK(values.nik);
		errors.nohp = isNotEmpty(values.nohp);
		return errors;
	}
})(Register);

mapStateToProps = ({form}) => {
	const { loading } = form.Login;
	return { loading };
}

export default connect(mapStateToProps, null)(RegisterForm);