import axios from 'axios';
import { setAlert} from './alerts';
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    USER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.post('http://localhost:5000/api/auth/login');
        dispatch({
            type: USER_LOADED,
            payload: res.data.token
        });
    } catch (err){
        dispatch({
            type: USER_FAIL
        });
    }
}

export const register = ({ email, password}) => async dispatch=> {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password});

    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err){
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const login = ({ email, password}) => async dispatch=> {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password});

    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err){
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}