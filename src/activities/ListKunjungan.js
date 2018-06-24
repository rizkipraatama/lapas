import React, {Component} from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import { Header } from "../components/";
import { List, ListItem } from 'react-native-elements';
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

		visitsListItem = this.props.visits.map((user) => (
			<ListItem
				key={user.login.username}
				roundAvatar
				avatar={{ uri: user.picture.thumbnail }}
				title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
				subtitle={user.email}
				onPress={() => { this.props.navigation.navigate('PrisonerDetail', { ...user }) }}
			/>
		));

		return (
			<List>
				{visitsListItem}
			</List>
		)
	}

	static navigationOptions = (props) => {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor(Theme.STATUS_BAR_TRANSLUCENT);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<Header 
					left={{icon: 'menu', onPress: () => this.props.navigation.openDrawer()}} 
					title="Kunjungan Lapas"/>
				<ScrollView>
						{this.renderVisit()}
				</ScrollView>
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