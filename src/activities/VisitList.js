import React, {Component} from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import { Header } from "../components/";
import { List, ListItem } from 'react-native-elements';
import * as Theme from '../constant/Theme';

import { connect } from 'react-redux';
import { fetchVisits } from "../actions";

class VisitList extends Component {
	constructor(props){
		super(props);
		this.props.fetchVisits({ token: this.props.token });
		this.renderVisits.bind(this);
	}

	renderVisits(){
		if (!this.props.visits) return null;

		visitListItem = this.props.visits.map((visit) => (
			<ListItem
        hideChevron
				key={visit.id}
				title={`Prisoner: ${visit.prisoner}`}
				subtitle={`${visit.hari} - ${visit.approved ? 'disetujui' : 'ditolak'}`}
			/>
		));

		return (
			<List>
				{visitListItem}
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
					title="List Kunjungan"/>
				<ScrollView>
						{this.renderVisits()}
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

export default connect(mapStateToProps, { fetchVisits })(VisitList);