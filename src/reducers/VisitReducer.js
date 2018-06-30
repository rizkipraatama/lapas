import {
  FETCH_VISIT,
  FETCH_VISIT_SUCCESS,
  FETCH_VISIT_FAILED,
  FETCH_SCHEDULES,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_FAILED
} from '../constant/Actions';

const INITIAL_STATE = {
  loading: false,
  schedules: [],
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_VISIT:
      return { ...state, loading: true };
    case FETCH_VISIT_SUCCESS:
      return { ...state, loading: false, visits: action.payload };
    case FETCH_VISIT_FAILED:
      return { ...state, loading: false, error: action.payload };
    case FETCH_SCHEDULES:
      return { ...state, loading: true };
    case FETCH_SCHEDULES_SUCCESS:
      return { ...state, loading: false, schedules: action.payload };
    case FETCH_SCHEDULES_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};