import React, {Component} from 'react';
import { Text } from "react-native";
import { Card, CardSection, Input, Button, Spinner } from '../components';

import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class Login extends Component {

	onEmailChange(text){
		this.props.emailChanged(text);
	}

	onPasswordChange(text){
		this.props.passwordChanged(text);
	}

	onButtonPress(){
		const { email, password } = this.props;
		
		this.props.loginUser({email, password});
	}

	renderButton(){
		if(this.props.loading) {
			return <Spinner size='large' />;
		} else {
			return (
				<Button onPress={this.onButtonPress.bind(this)}>
					Login
				</Button>
			);
		}
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input 
						label="Email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input 
						secureTextEntry
						label="Password"
						placeholder="password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, token } = auth;

	return { email, password, error, loading, token };
}

export default connect(mapStateToProps, {
	emailChanged, passwordChanged, loginUser
})(Login);