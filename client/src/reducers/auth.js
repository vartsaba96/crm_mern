import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    USER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenicated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action){
    const { type, payload} = action;

    switch(type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenicated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenicated: true,
                loading: false
            }
        case USER_FAIL:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenicated: false,
                loading: false
            }
            default:
                return state;

    }
}