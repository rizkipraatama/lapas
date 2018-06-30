import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FORM_IDLE,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FORM_IDLE,
} from '../constant/Actions';
import { Alert, AsyncStorage } from "react-native";
import Navigation from '../services/Navigation';
import { change, reset, SubmissionError } from "redux-form";

import { formRequest } from "../services/Networking";

export const updateProfile = ({fullname, gender, address, nik, nohp}, dispatch, props) => {
  dispatch({type: UPDATE_PROFILE});
  return formRequest('/api/edit_profile', 'POST', {
    'username': props.user.username, nama: fullname, alamat: address,
    nik, telepon: nohp, jenis_kelamin: gender
  }).then((r) => {
      dispatch({type: UPDATE_PROFILE_FORM_IDLE });
      if (!r.error) {
        updateProfileSuccess(dispatch, r.profile);
      } else {
        updateProfileFailed(dispatch, r.error_message);
      }
    }).catch((error) => {
      dispatch({type: UPDATE_PROFILE_FORM_IDLE });
      console.tron.error(error);
    });
}

const updateProfileSuccess = async (dispatch, profile) => {
  dispatch({type: UPDATE_PROFILE_SUCCESS, payload: profile});
  try { 
    await AsyncStorage.setItem('auth', JSON.stringify({ token: profile.access_token, user: profile }));
  } catch (error) {
    Alert.alert("Penyimpanan AsyncStorage gagal!", "Kesalahan aplikasi atau hak akses storage dinonaktifkan");
  }
  Alert.alert(
    'Profile berhasil diperaharui!',
    null,
    [
      { text: 'OK', onPress: () => { Navigation.replaceWith('Home'); } },
    ],
    { cancelable: false }
  );
}

const updateProfileFailed = (dispatch, message) => {
  Alert.alert('Perbaharuan Profile Gagal', message);
}

export const updatePassword = ({password, newPassword}, dispatch, props) => {
  dispatch({type: UPDATE_PASSWORD});
  return formRequest('/api/edit_password', 'POST', {
    'username': props.user.username, 'password': password, 'newPassword': newPassword
  }).then((r) => {
      dispatch({type: UPDATE_PASSWORD_FORM_IDLE });
      if (!r.error) {
        updatePasswordSuccess(dispatch);
      } else {
        updatePasswordFailed(dispatch, r.error_message);
      }
    }).catch((error) => {
      dispatch({type: UPDATE_PASSWORD_FORM_IDLE });
      console.tron.error(error);
    });
}

const updatePasswordSuccess = async (dispatch) => {
  dispatch({type: UPDATE_PASSWORD_SUCCESS});
  Alert.alert(
    'Paasword berhasil diperaharui!',
    null,
    [
      { text: 'OK', onPress: () => { Navigation.replaceWith('Home'); } },
    ],
    { cancelable: false }
  );
}

const updatePasswordFailed = (dispatch, message) => {
  dispatch(change('UpdatePassword', 'password', ''));
  Alert.alert('Perbaharuan Password Gagal', message);
}
