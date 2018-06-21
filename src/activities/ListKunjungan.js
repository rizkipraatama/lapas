import React, {Component} from 'react';
import { Text, StatusBar, View, TouchableOpacity } from 'react-native';
import { Header } from "../components/";
import * as Theme from '../constant/Theme';

import { connect } from 'react-redux';
import { fetchVisit } from "../actions";

import Navigator from '../services/Navigation';

class ListKunjungan extends Component {
	constructor(props){
		super(props);
		this.props.fetchVisit({ token: this.props.token });
		this.renderVisit.bind(this);
	}

	renderVisit(){
		if (!this.props.visits) return null;
		console.log(this.props.visits);
		return null;
	}

	static navigationOptions = (props) => {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor(Theme.STATUS_BAR_TRANSLUCENT);
	}

	render() {
		return (
			<View>
				<Header 
					left={{icon: 'menu', onPress: () => Navigator.openDrawer()}} 
					title="Kunjungan Lapas"
					right={{icon: 'plus', onPress: () => Navigator.navigate('Login')}}/>
				<Text>{this.props.token}</Text>
				{/* TODO: Change this to React Native ListView*/}
				{this.renderVisit()}
			</View>
		);
	}
}

const mapStateToProps = ({ auth, visit }) => {
	const { token } = auth;
	const { visits, loading } = visit;
	return { token, visits, loading };
}

export default connect(mapStateToProps, { fetchVisit })(ListKunjungan);