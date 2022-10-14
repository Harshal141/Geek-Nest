// this remains same 
// put this in app.js file
// import { Provider } from 'react-redux';
// import store from './store';

import { createStore , applyMiddleware } from 'redux' ;
import thunk from 'redux-thunk' ;
import rootReducer from './reducers' ;
import { composeWithDevTools } from 'redux-devtools-extension' ;

const initialState = {} ;

const middleware = [ thunk ] ;

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;