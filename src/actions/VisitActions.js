import {
  FETCH_VISIT,
  FETCH_VISIT_SUCCESS,
  FETCH_VISIT_FAILED,
  FETCH_SCHEDULES,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_FAILED,
  VISIT_PRISONER,
  VISIT_FORM_IDLE,
} from '../constant/Actions';
import { Alert } from "react-native";
import Navigation from '../services/Navigation';
import { change, reset, SubmissionError } from "redux-form";

import { formRequest } from '../services/Networking';

export const fetchVisits = (visitorID) => {
  return (dispatch) => {
    dispatch({ type: FETCH_VISIT });
    formRequest(`/api/kunjungan?username=${visitorID}`, 'GET')
      .then((r) => {
          if (!r.error) {
            fetchVisitSuccess(dispatch, r.data);
          } else {
            fetchVisitFailed(dispatch, r,error_message);
          }
      });
  }
}

const fetchVisitSuccess = (dispatch, visits) => {
  dispatch({ type: FETCH_VISIT_SUCCESS, payload: visits });
}

const fetchVisitFailed = (dispatch, error) => {
  dispatch({ type: FETCH_VISIT_FAILED, payload: error });
}

export const createVisit = ({hari, ktp, suratizin}, dispatch, props) => {
  console.log(props.token);
  dispatch({type: VISIT_PRISONER});
  // const data = new FormData();
  // data.append('fotoktp', {
  //   uri: fotoktp.uri,
  //   type: 'image/jpeg',
  //   name: 'testPhotoName'
  // });
  // data.append('suratizin', {
  //   uri: suratizin.uri,
  //   type: 'image/jpeg',
  //   name: 'testPhotoName'
  // });
  formRequest('/api/set_kunjungan', 'POST', {
    'id_pengunjung': props.visitorID,
    'id_tahanan': props.prisonerID,
    'id_hari_kunjungan': hari,
  }).then((r) =>{
    dispatch({type: VISIT_FORM_IDLE});
    if (!r.error) {
      createVisitSuccess(dispatch);
    } else {
      createVisitFailed(dispatch, r.error_message);
    }
  }).catch((e) => {
    dispatch({type: VISIT_FORM_IDLE});
    console.tron.error(e);
  });

}

const createVisitSuccess = (props) => {
  Navigation.replaceWith('Home');
  dispatch(reset('Visit'));
}

const createVisitFailed = (props, error) => {
  Alert.alert("Pengajuan Gagal", error);
}

export const fetchSchedules = (jenis) => {
  return (dispatch) => {
    dispatch({ type: FETCH_SCHEDULES });
    formRequest(`/api/hari?jenis=${jenis}`, 'GET')
      .then((r) => {
        if (!r.error) {
          fetchSchedulesSuccess(dispatch, r.data);
        } else {
          fetchSchedulesFailed(dispatch, r.error_message);
        }
      });
  }
}

const fetchSchedulesSuccess = (dispatch, schedules) => {
  dispatch({ type: FETCH_SCHEDULES_SUCCESS, payload: schedules });
}

const fetchSchedulesFailed = (dispatch, error) => {
  dispatch({ type: FETCH_SCHEDULES_FAILED, payload: error});
}