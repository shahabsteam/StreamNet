import {
    SIGN_IN,
    SIGN_OUT,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    isSignedIn: false,
    userEmail: null,
    error: null,
    success: null,
    token: null,
  };
  
  // Load the initial state from localStorage if available
  var persistedState = JSON.parse(localStorage.getItem('authState'));
  persistedState.error = null;
  persistedState.success = null;
  
  const AuthReducer =  (state = persistedState || INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGN_IN:
        return { ...state, isSignedIn: true, userEmail: action.payload };
      case SIGN_OUT:
        return { ...state, isSignedIn: false, userEmail: null };
      case LOGIN_FAILURE:
        return { ...state, isSignedIn: false, userEmail: null, error: action.payload };
      case LOGIN_SUCCESS:
        return { ...state, isSignedIn: true, userEmail: action.payload };
      case REGISTER_SUCCESS:
        return { ...state, isSignedIn: false, userEmail: null, success: action.payload, error: null };
      case REGISTER_FAILURE:
        return { ...state, isSignedIn: false, userEmail: null, error: action.payload };
      default:
        return state;
    }
  };
  export default AuthReducer;