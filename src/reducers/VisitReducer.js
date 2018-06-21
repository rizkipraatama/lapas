import {
  FETCH_VISIT,
  FETCH_VISIT_SUCCESS
} from '../constant/Actions';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_VISIT:
      return { ...state, loading: true };
    case FETCH_VISIT_SUCCESS:
      return { ...state, loading: false, visits: action.payload };
    default:
      return state;
  }
};