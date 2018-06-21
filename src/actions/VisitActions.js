import {
  FETCH_VISIT,
  FETCH_VISIT_SUCCESS,
} from '../constant/Actions';
import { Alert } from "react-native";
import Navigation from '../services/Navigation';
import { change, reset, SubmissionError } from "redux-form";

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
          fetchVisitSuccess(dispatch, res.categories);
        }
    });
  }
}

const fetchVisitSuccess = (dispatch, visits) => {
  dispatch({ type: FETCH_VISIT_SUCCESS, payload: visits });
}