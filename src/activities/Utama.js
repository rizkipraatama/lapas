import React, {Component} from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from "react-navigation";

import { connect } from 'react-redux';

class PersonalizedPost extends Component {

	render() {
		return (
			<Text>{this.props.token}</Text>
		);
	}
}

class UnAnsweredPost extends Component {
	render() {
		return (
			<Text> Belum Dijawab </Text>
		);
	}
}

class NewestPost extends Component {
	render() {
		return (
			<Text> Terbaru </Text>
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