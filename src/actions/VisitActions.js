import {
  FETCH_VISIT,
  FETCH_VISIT_SUCCESS,
  VISIT_PRISONER,
  VISIT_FORM_IDLE,
} from '../constant/Actions';
import { Alert } from "react-native";
import Navigation from '../services/Navigation';
import { change, reset, SubmissionError } from "redux-form";

import { visits } from '../datamock'

export const fetchVisits = ({token}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_VISIT });
    fetch('http://35.198.204.194:8000/categories/', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((res) => {
        if (res) {
          // TODO: Change mock to real data
          fetchVisitSuccess(dispatch, visits);
        }
    });
  }
}

const fetchVisitSuccess = (dispatch, visits) => {
  dispatch({ type: FETCH_VISIT_SUCCESS, payload: visits });
}

export const createVisit = ({tipe, ktp, suratizin}, dispatch, props) => {
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
  Navigation.replaceWith('Home');
  dispatch(reset('Visit'));
  dispatch({type: VISIT_FORM_IDLE});
}
