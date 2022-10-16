// its our reduces 
// we are going to create a function that takes in a state and an action
const {SET_ALERT , REMOVE_ALERT} = require('../actions/types');
const initialState =  [];

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}