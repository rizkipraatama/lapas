import React, {Component} from 'react';
import { ScrollView, KeyboardAvoidingView, StatusBar, Text } from 'react-native';
import { Button, Input, TranslucentHeader, ButtonGroup } from "../components";
import { connect } from 'react-redux';
import { updatePassword } from '../actions';
import { isUsernameValid, isPasswordValid, isEmailValid, isNotEmpty, isNIK } from '../validator';
import { reduxForm, Field } from 'redux-form';

import * as Theme from "../constant/Theme";

class UpdatePassword extends Component {

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
						name='password'
						component={Input}
						icon="key"
						placeholder="Kata Sandi Lama"
						secureTextEntry
						returnKeyType="next"
						onSubmitEditing={()=>this.newPasswordInput.focus()}
						getRef={(ref)=>this.passwordInput = ref}
					/>
					<Field
						name='newPassword'
						component={Input}
						icon="key"
						placeholder="Kata Sandi Baru"
						secureTextEntry
						returnKeyType="go"
						getRef={(ref)=>this.newPasswordInput = ref}
					/>
					<Button 
						onPress={this.props.handleSubmit(updatePassword)}
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

UpdatePasswordForm =  reduxForm({
	form: 'UpdatePassword',
	validate: (values) => {
		const errors = {};
		errors.password = isPasswordValid(values.password);
		errors.newPassword = isPasswordValid(values.newPassword);
		return errors;
	}
})(UpdatePassword);

mapStateToProps = ({form, auth}) => {
	const { loading } = form.UpdatePassword;
	const { user } = auth;
	return { loading, user };
}

export default connect(mapStateToProps, null)(UpdatePasswordForm);