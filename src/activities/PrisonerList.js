import React, {Component} from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import { Header, Input, ActivityFiller } from "../components/";
import { List, ListItem } from 'react-native-elements';
import * as Theme from '../constant/Theme';

import { connect } from 'react-redux';
import { fetchPrisoners } from "../actions";
import { reduxForm, Field } from 'redux-form';

class PrisonerList extends Component {
	constructor(props){
		super(props);
		this.props.fetchPrisoners({ token: this.props.token });
		this.renderPrisoners.bind(this);
	}

	renderPrisoners(){
		if (!this.props.prisoners) return null;

		prisonerListItem = this.props.prisoners.filter((p) => {
			return `${p.nama} ${p.no_instansi} ${p.alias} ${p.status}`.toLowerCase().search(this.props.search.toLowerCase()) != -1
		}).map((prisoner, index) => (
			<ListItem
				key={prisoner.id}
				title={`${prisoner.nama} - Instansi: ${prisoner.no_instansi}`}
				subtitle={`Alias: ${prisoner.alias} - Status : ${prisoner.status[0].toUpperCase() + prisoner.status.slice(1)}`}
				onPress={() => { this.props.navigation.navigate('PrisonerDetail', { prisoner, index }) }}
			/>
		));

		if (this.props.prisoners.length == 0) {
			return (<ActivityFiller icon = "null" title = "Belum ada penghuni lapas" loading={this.props.loading}/>);
		} else if (prisonerListItem.length == 0) {
			return (<ActivityFiller icon = "null" title = "Penghuni yang kamu cari tidak ditemukan" loading={false}/>);
		} else {
			return (
				<ScrollView>
					<List>
						{prisonerListItem}
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
					title="Penghuni Lapas"/>
				<View style={styles.filterContainer}>
					<Field
						name='search'	
						component={ Input }
						icon="magnify"
						placeholder="Cari penghuni"
						returnKeyType="go"
					/>
				</View>
				{this.renderPrisoners()}
			</View>
		);
	}
}

const styles = {
	filterContainer: {
		backgroundColor: Theme.COLORED_BACKGROUND,
		paddingHorizontal: 10
	}
}

filterPrisonerForm =  reduxForm({
	form: 'FilterPrisoner',
	validate: (values) => {
		const errors = {};
		return errors;
	}
})(PrisonerList);

const mapStateToProps = ({ auth, prisoner, form }) => {
	const { token } = auth;
	const { prisoners, loading } = prisoner;
	const values = form.FilterPrisoner ? form.FilterPrisoner.values : {};
	const { search = '' } = values ? values : {};
	return { search, token, prisoners, loading };
}

export default connect(mapStateToProps, { fetchPrisoners })(filterPrisonerForm);