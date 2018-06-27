import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, StatusBar, Text, View } from 'react-native';
import { Button, ImageInput, TranslucentHeader, ButtonGroup } from "../components";
import * as Theme from "../constant/Theme";

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { isNotEmpty } from '../validator';


class FormVisit1 extends Component {
	constructor(props){
		super(props);
		this.props.initialize({ setuju: false });

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
						title="Pengajuan Kunjungan (1/2)"
						onPress={()=>this.props.navigation.navigate('PrisonerDetail')}/>
					<View>
						<Text>{this.props.user.name}</Text>
						<Text>{this.props.user.email}</Text>
						<Text>{this.props.user.nik}</Text>
						<Text>{this.props.user.nohp}</Text>
					</View>
					<Field
						name='ktp'
						component={ImageInput}
						icon="account-card-details"
						placeholder="Foto KTP"
						returnKeyType="next"
					/>
					<Field
						name='suratizin'
						component={ImageInput}
						icon="file-document"
						placeholder="Foto Surat Izin"
						returnKeyType="go"
						display={this.props.currPrisoner.tipe == "narapidana" ? 'flex' : 'none'}
					/> 
					<Button 
						onPress={() => {this.props.navigation.navigate({routeName: 'FormVisit2'})}}
						isValid={valid && !pristine}>
						<Text>Berikutnya</Text>
					</Button>
				</KeyboardAvoidingView>
			</ScrollView>
    );
	}
}
const styles = {
	container1: {
    height: 150,
    backgroundColor: Theme.COLORED_BACKGROUND+'CC',
    paddingTop: Theme.STATUS_BAR_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  container: {
		flex: 1,
		backgroundColor: Theme.COLORED_BACKGROUND,
		padding: 16
	}
}

reduxFormVisit =  reduxForm({
	form: 'Visit',
	destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
	validate: (values) => {
		const errors = {};
		errors.ktp = isNotEmpty(values.ktp);
		if (values.tipe == "narapidana"){
			errors.suratizin = isNotEmpty(values.suratizin);
		}
		return errors;
	},
})(FormVisit1);

const mapStateToProps = ({auth, prisoner}, props) => {
	const { user } = auth;
	const currPrisoner = prisoner.prisoners[props.navigation.state.params.index];
  return { user, currPrisoner };
};

export default connect(mapStateToProps, null)(reduxFormVisit);
