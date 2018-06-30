import React, {Component} from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import { Header } from "../components/";
import { List, ListItem } from 'react-native-elements';
import * as Theme from '../constant/Theme';

import { connect } from 'react-redux';
import { fetchPrisoners } from "../actions";

class PrisonerList extends Component {
	constructor(props){
		super(props);
		this.props.fetchPrisoners({ token: this.props.token });
		this.renderPrisoners.bind(this);
	}

	renderPrisoners(){
		if (!this.props.prisoners) return null;

		prisonerListItem = this.props.prisoners.map((prisoner, index) => (
			<ListItem
				key={prisoner.id}
				title={`${prisoner.nama} - ID: ${prisoner.id} - Instansi: ${prisoner.no_instansi}`}
				subtitle={`${prisoner.pasal} - ${prisoner.status[0].toUpperCase() + prisoner.status.slice(1)}`}
				onPress={() => { this.props.navigation.navigate('PrisonerDetail', { prisoner, index }) }}
			/>
		));

		return (
			<List>
				{prisonerListItem}
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
					title="Penghuni Lapas"/>
				<ScrollView>
						{this.renderPrisoners()}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ auth, prisoner }) => {
	const { token } = auth;
	const { prisoners, loading } = prisoner;
	return { token, prisoners, loading };
}

export default connect(mapStateToProps, { fetchPrisoners })(PrisonerList);