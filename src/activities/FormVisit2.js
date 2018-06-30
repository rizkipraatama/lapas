import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, StatusBar, Text, View } from 'react-native';
import { Button, TranslucentHeader, CheckBox } from "../components";
import * as Theme from "../constant/Theme";

import { connect } from 'react-redux';
import { createVisit } from "../actions";
import { reduxForm, Field } from 'redux-form';
import { isAgreement } from '../validator';

import * as Strings from '../constant/Strings'

class FormVisit2 extends Component {
  constructor(props){
    super(props);
  }

  render() {
  	const { valid, pristine } = this.props;
    return (
      <View style={styles.container}>
				<KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
					<StatusBar 
						backgroundColor={Theme.TRANSLUCENCY}
						translucent={true}/>
					<TranslucentHeader 
						title="Pengajuan Kunjungan (2/2)"
						onPress={()=>this.props.navigation.goBack()}
            icon="arrow-left"/>
          <ScrollView style={styles.rulesContainer}>
            <Text style={{fontSize: Theme.H5}}>Peraturan Kunjungan</Text>
            <Text style={{fontSize: Theme.BODY2}}>
              {Strings.VISIT_RULE}
            </Text>
          </ScrollView>
					<Field
						name='setuju'
						component={CheckBox}
            title = "Setuju dengan peraturan"
					/>
					<Button 
						onPress={this.props.handleSubmit(createVisit)}
						isLoading={this.props.loading}
						isValid={valid && !pristine}>
						<Text>Ajukan Kunjungan</Text>
					</Button>
				</KeyboardAvoidingView>
			</View>
    );
	}
}
const styles = {
  container: {
    flex: 1,
		backgroundColor: Theme.COLORED_BACKGROUND,
		padding: 16
  },
  rulesContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  }
}

reduxFormVisit2 =  reduxForm({
  form: 'Visit',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
	validate: (values) => {
    const errors = {};
    errors.setuju = isAgreement(values.setuju);
		return errors;
	},
})(FormVisit2);

const mapStateToProps = ({auth, prisoner, form}, props) => {
  const { loading } = form.Visit;
  const prisonerID = prisoner.prisoners[props.navigation.state.params.index].id;
  const visitorID = auth.user.username;
  return { loading, visitorID, prisonerID };
};

export default connect(mapStateToProps, null)(reduxFormVisit2);