import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, StatusBar, Text, View } from 'react-native';
import { Button, ImageInput, TranslucentHeader, Picker } from "../components";
import * as Theme from "../constant/Theme";

import { connect } from 'react-redux';
import { fetchSchedules } from '../actions';
import { reduxForm, Field } from 'redux-form';
import { isNotEmpty } from '../validator';

class FormVisit1 extends Component {
	constructor(props){
		super(props);
		this.props.initialize({ setuju: false });
		this.props.fetchSchedules(this.props.currPrisoner.status);
	}

  render() {
		const { valid, pristine } = this.props;
		const { index } = this.props.navigation.state.params;

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
						<Text style={{fontSize: Theme.H6}}>Kunjungan</Text>
						<Text>{this.props.currPrisoner.id}</Text>
						<Text>{this.props.currPrisoner.nama}</Text>
						<Text>{this.props.currPrisoner.no_instansi}</Text>
					</View>
					<View>
						<Text style={{fontSize: Theme.H6}}>Info Pengunjung</Text>
						<Text>{this.props.user.nama}</Text>
						<Text>{this.props.user.nik}</Text>
					</View>
					<Field
						name='hari'
						component={Picker}
						icon="calendar-clock"
						placeholder=" -- Pilih hari kunjungan --"
						item={this.props.schedules.map((s) => {
							return { label: `${s.hari} / ${s.jam_awal.slice(0, -3)} - ${s.jam_akhir.slice(0, -3)}`, 'value': s.id }
						})}
					/>
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
						display={this.props.currPrisoner.status == "narapidana" ? 'flex' : 'none'}
					/> 
					<Button 
						onPress={() => {this.props.navigation.navigate('FormVisit2', { index })}}
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
		errors.hari = isNotEmpty(values.hari);
		errors.ktp = isNotEmpty(values.ktp);
		if (values.tipe == "narapidana"){
			errors.suratizin = isNotEmpty(values.suratizin);
		}
		return errors;
	},
})(FormVisit1);

const mapStateToProps = ({auth, prisoner, visit}, props) => {
	const { user } = auth;
	const currPrisoner = prisoner.prisoners[props.navigation.state.params.index];
	const { schedules } = visit;
  return { user, currPrisoner, schedules };
};

export default connect(mapStateToProps, { fetchSchedules })(reduxFormVisit);
