import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Input, TranslucentHeader } from "../components";
import * as Theme from "../constant/Theme";
import { ScrollView, KeyboardAvoidingView, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { isNotEmpty } from '../validator';
import { createVisit } from "../actions";

class FormVisit extends Component {
  render() {
  	const { valid, pristine } = this.props;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'} >
				<KeyboardAvoidingView behavior='padding'>
					<StatusBar 
						backgroundColor={Theme.TRANSLUCENCY}
						translucent={true}/>
					<TranslucentHeader 
						title="Pengajuan Kunjungan"
						onPress={()=>this.props.navigation.navigate('PrisonerDetail')}/>
					<View>
						<Text>{this.props.name}</Text>
						<Text>{this.props.email}</Text>
						<Text>{this.props.nik}</Text>
						<Text>{this.props.nohp}</Text>
					</View>
					<Field
						name='ktp'
						component={Input}
						icon="file-document"
						placeholder="Foto KTP"
						returnKeyType="next"
						onSubmitEditing={()=>this.suratizinInput.focus()}
					/>
					<Field
						name='suratizin'
						component={Input}
						icon="file-document"
						placeholder="Foto Surat Izin"
						secureTextEntry
						returnKeyType="go"
						getRef={(ref)=>this.suratizinInput = ref}
					/>
					<Button 
						onPress={this.props.handleSubmit(createVisit)}
						isLoading={this.props.loading}
						isValid={valid && !pristine}>
						<Text>Ajukan Kunjungan</Text>
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

VisittForm =  reduxForm({
	form: 'Visit',
	validate: (values) => {
		const errors = {};
		errors.ktp = isNotEmpty(values.ktp);
		errors.suratizin = isNotEmpty(values.suratizin);
		return errors;
	}
})(FormVisit);

const mapStateToProps = ({auth, form}) => {
	const { loading } = form.Visit;
  const { name, email, nik, nohp } = auth.user;
	const token = auth.token;
  return { loading, name, email, nik, nohp, token };
};

export default connect(mapStateToProps, null)(VisittForm);


