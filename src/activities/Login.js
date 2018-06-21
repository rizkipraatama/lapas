import React, {Component} from 'react';
import { KeyboardAvoidingView, StatusBar, Text } from 'react-native';
import { Button, Input, Logo } from "../components";
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { isUsernameValid, isPasswordValid } from '../validator';
import Navigator from '../services/Navigation'
import { reduxForm, Field } from 'redux-form';

import * as Theme from "../constant/Theme";

class Login extends Component {

	render() {
		const { valid, pristine } = this.props;
		return (
			<KeyboardAvoidingView style={styles.container}>
				<StatusBar 
					backgroundColor={Theme.TRANSLUCENCY}
					translucent={true}/>
				<Logo 
					source={require('../../assets/image/Logo_Lapas.png')} 
					title="Info Lapas"/>
				<Field 
					name='username'
					component={Input}
					icon="account"
					placeholder="Username"
					returnKeyType="next"
					onSubmitEditing={()=>this.inputpassword.focus()}
				/>
				<Field
					name='password'
					component={Input}
					icon="lock"
					placeholder="Kata Sandi"
					secureTextEntry
					returnKeyType="go"
					getRef={(input)=>this.inputpassword = input}
				/>
				<Button 
					onPress={this.props.handleSubmit(loginUser)}
					isLoading={this.props.loading}
					isValid={valid && !pristine}>
					<Text>Masuk</Text>
				</Button>
				<Text style={styles.registerText} onPress={()=>Navigator.navigate('Register')}> Belum punya akun? Registrasi sekarang!</Text>
			</KeyboardAvoidingView>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: Theme.COLORED_BACKGROUND,
		padding: 16
	},
	registerText: {
		textAlign: 'center',
		fontWeight: '700'
	}
}

LoginForm =  reduxForm({
	form: 'Login',
	validate: (values) => {
		const errors = {};
		errors.username = isUsernameValid(values.username);
		errors.password = isPasswordValid(values.password);
		return errors;
	}
})(Login);

mapStateToProps = ({form}) => {
	const { loading } = form.Login;
	return { loading };
}

export default connect(mapStateToProps, null)(LoginForm);