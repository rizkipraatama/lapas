import React, {Component} from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Input } from '../components';
import { createBottomTabNavigator } from "react-navigation";

import { connect } from 'react-redux';

class PersonalizedPost extends Component {

	render() {
		return (
			<Card>
				<CardSection>
					<Input 
						label="Token"
						value={this.props.token}
					/>
				</CardSection>
			</Card>
		);
	}
}

class UnAnsweredPost extends Component {
	render() {
		return (
			<Card>
				<CardSection>
					<Text> Belum Dijawab </Text>
				</CardSection>
			</Card>
		);
	}
}

class NewestPost extends Component {
	render() {
		return (
			<Card>
				<CardSection>
					<Text> Terbaru </Text>
				</CardSection>
			</Card>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { token } = auth;

	return { token };
}

const Personalized = connect(mapStateToProps, {})(PersonalizedPost);

const Utama = createBottomTabNavigator({
  Personalized, UnAnsweredPost, NewestPost
}); 

export default Utama;