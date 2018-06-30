import {
  FETCH_PRISONERS,
  FETCH_PRISONERS_SUCCESS,
  FETCH_PRISONERS_FAILED
} from '../constant/Actions';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_PRISONERS:
      return { ...state, loading: true };
    case FETCH_PRISONERS_SUCCESS:
      return { ...state, loading: false, prisoners: action.payload };
    case FETCH_PRISONERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};