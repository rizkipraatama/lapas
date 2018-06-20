import {
  SAVE_USER
} from '../constant/Actions';

const INITIAL_STATE = {
  token: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SAVE_USER:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};