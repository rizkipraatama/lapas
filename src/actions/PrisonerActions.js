import {
  FETCH_PRISONERS,
  FETCH_PRISONERS_SUCCESS,
} from '../constant/Actions';

import { formRequest } from "../services/Networking";

export const fetchPrisoners = ({token}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_PRISONERS });
    formRequest('/api/tahanan', 'GET')
      .then((r) => {
        if (!r.error) {
          fetchPrisonersSuccess(dispatch, r.data);
        } else {
          fetchPrisonersFailed(dispatch, r.error_message);
        }
      });
  }
}

const fetchPrisonersSuccess = (dispatch, prisoners) => {
  dispatch({ type: FETCH_PRISONERS_SUCCESS, payload: prisoners });
}

const fetchPrisonersFailed = (dispatch, error) => {
  dispatch({ type: FETCH_PRISONERS_FAILED, payload: error});
}
