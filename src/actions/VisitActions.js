import {
  FETCH_VISIT,
  FETCH_VISIT_SUCCESS,
} from '../constant/Actions';
import { Alert } from "react-native";
import Navigation from '../services/Navigation';
import { change, reset, SubmissionError } from "redux-form";

import { penghuni } from '../datamock'

export const fetchVisit = ({token}) => {
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
          fetchVisitSuccess(dispatch, penghuni);
        }
    });
  }
}

const fetchVisitSuccess = (dispatch, visits) => {
  dispatch({ type: FETCH_VISIT_SUCCESS, payload: visits });
}