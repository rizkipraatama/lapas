import {
  SAVE_USER,
  DELETE_USER,
} from '../constant/Actions';

const INITIAL_STATE = {
  token: null,
  user: {
    name: null,
    username: null,
    email: null,
    nohp: null,
    nik: null,
    alamat: null,
  }
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SAVE_USER:
      return { ...state, token: action.payload.token, user: action.payload.user };
    case DELETE_USER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};