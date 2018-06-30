import {
  SAVE_USER,
  DELETE_USER,
  UPDATE_PROFILE_SUCCESS
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
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};