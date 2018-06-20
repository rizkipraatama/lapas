import React, {Component} from 'react';
import { ScrollView, KeyboardAvoidingView, StatusBar, Text } from 'react-native';
import { Button, Input, TranslucentHeader } from "../components";
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { isUsernameValid, isPasswordValid, isEmailValid, isNotEmpty } from '../validator';
import Navigator from '../services/Navigation'
import { reduxForm, Field } from 'redux-form';

import * as Theme from "../constant/Theme";

class Register extends Component {

	render() {
		const { valid, pristine } = this.props;
		console.log(this.props);
		return (
			<ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'} >
				<KeyboardAvoidingView behavior='padding'>
					<StatusBar 
						backgroundColor={Theme.TRANSLUCENCY}
						translucent={true}/>
					<TranslucentHeader 
						title="Pendaftaran"
						onPress={()=>Navigator.navigate('Login')}/>
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
						onSubmitEditing={()=>this.emailInput.focus()}
						getRef={(ref)=>this.usernameInput = ref}
					/>
					<Field
						name='email'
						component={Input}
						icon="email"
						placeholder="Alamat Email"
						returnKeyType="next"
						onSubmitEditing={()=>this.passwordInput.focus()}
						getRef={(ref)=>this.emailInput = ref}
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
					{/* FIXME: props.loading is broken, plan is to get the loading states from redux-form */}
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
		errors.email = isEmailValid(values.email);
		errors.password = isPasswordValid(values.password);
		errors.address = isNotEmpty(values.address);
		errors.nik = isNotEmpty(values.nohp);
		errors.nohp = isNotEmpty(values.nohp);
		return errors;
	}
})(Register);

export default connect(null, null)(RegisterForm);