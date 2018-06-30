import React, {Component} from 'react';
import { ScrollView, KeyboardAvoidingView, StatusBar, Text } from 'react-native';
import { Button, Input, TranslucentHeader, ButtonGroup } from "../components";
import { connect } from 'react-redux';
import { updateProfile } from '../actions';
import { isNotEmpty, isNIK } from '../validator';
import { reduxForm, Field } from 'redux-form';

import * as Theme from "../constant/Theme";

class UpdateProfile extends Component {

	constructor(props){
		super(props);
		this.props.initialize({ 
      fullname: this.props.user.nama, 
      gender: this.props.user.jenis_kelamin,
      address: this.props.user.alamat,
      nik: this.props.user.nik,
      nohp: this.props.user.telepon,
    });
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
						title="Perbaharuan Profile"
						onPress={()=>this.props.navigation.goBack()}/>
					<Field
						name="fullname"
						component={Input}
						icon="clipboard-account"
						placeholder="Nama Lengkap"
						returnKeyType="next"
					/>
					<Field
						name='gender'
						component={ButtonGroup}
						icon={'gender-male-female'}
						buttons={[{title: 'Laki-laki', value: 'L'}, {title: 'Perempuan', value: 'P'}]}
					/>
					<Field
						name='address'
						component={Input}
						icon="home"
						placeholder="Alamat Rumah"
						multiline
						returnKeyType="next"
						onSubmitEditing={()=>this.nikInput.focus()}
						getRef={(ref)=>this.alamatInput = ref}
					/>
					<Field
						name='nik'
						component={Input}
						icon="account-card-details"
						placeholder="NIK"
						returnKeyType="next"
						onSubmitEditing={()=>this.numberInput.focus()}
						getRef={(ref)=>this.nikInput = ref}
					/>
					<Field
						name='nohp'
						component={Input}
						icon="cellphone"
						placeholder="Nomor HP"
						returnKeyType="go"
						getRef={(ref)=>this.numberInput = ref}
					/>
					<Button 
						onPress={this.props.handleSubmit(updateProfile)}
						isLoading={this.props.loading}
						isValid={valid && !pristine}>
						<Text>Perbaharui</Text>
					</Button>
				</KeyboardAvoidingView>
			</ScrollView>
			
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: Theme.COLORED_BACKGROUND,
		padding: 16
	},
}

UpdateProfileForm =  reduxForm({
	form: 'UpdateProfile',
	validate: (values) => {
		const errors = {};
		errors.fullname = isNotEmpty(values.fullname);
		errors.address = isNotEmpty(values.address);
		errors.nik = isNIK(values.nik);
		errors.nohp = isNotEmpty(values.nohp);
		return errors;
	}
})(UpdateProfile);

mapStateToProps = ({auth, form}) => {
  const { loading } = form.UpdateProfile;
  const { user } = auth;
	return { loading, user };
}

export default connect(mapStateToProps, null)(UpdateProfileForm);