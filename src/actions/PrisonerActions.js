import {
  FETCH_PRISONERS,
  FETCH_PRISONERS_SUCCESS,
} from '../constant/Actions';

import { penghuni  as prisoners } from '../datamock'

export const fetchPrisoners = ({token}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_PRISONERS });
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
          fetchPrisonersSuccess(dispatch, prisoners);
        }
    });
  }
}

const fetchPrisonersSuccess = (dispatch, prisoners) => {
  dispatch({ type: FETCH_PRISONERS_SUCCESS, payload: prisoners });
}
