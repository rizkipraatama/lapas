import React, {Component} from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import { Header, ActivityFiller } from "../components/";
import { List, ListItem } from 'react-native-elements';
import * as Theme from '../constant/Theme';

import { connect } from 'react-redux';
import { fetchVisits } from "../actions";

class VisitList extends Component {
	constructor(props){
		super(props);
		this.props.fetchVisits(this.props.visitorID);
		this.renderVisits.bind(this);
	}

	renderVisits(){
		if (!this.props.visits) return null;

		visitListItem = this.props.visits.map((visit) => (
			<ListItem
        hideChevron
				key={visit.id}
				title={`Prisoner: ${visit.nama}`}
				subtitle={`${visit.hari} - ${visit.visit_status}`}
			/>
		));
		
		if (this.props.visits.length == 0) {
			return (
				<ActivityFiller icon = "null" title = "Belum ada rencana kunjungan" loading={this.props.loading}/>
			);
		} else {
			return (
				<ScrollView>
					<List>
						{visitListItem}
					</List>
				</ScrollView>
			)
		}
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
					{this.renderVisits()}
			</View>
		);
	}
}

const mapStateToProps = ({ auth, visit }) => {
	const visitorID = auth.user.username;
	const { visits, loading } = visit;
	return { visitorID, visits, loading };
}

export default connect(mapStateToProps, { fetchVisits })(VisitList);