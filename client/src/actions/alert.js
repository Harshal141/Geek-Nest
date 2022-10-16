// npm install uuid to generate random id
import {SET_ALERT, REMOVE_ALERT} from './types';
import {v4 as uuid} from 'uuid';

// we are going to use dispatch to send the action to the reducer
export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}