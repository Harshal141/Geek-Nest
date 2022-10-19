import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// importing router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React,{useEffect} from 'react';

// redux
// provider combines react with redux so we enclose all components innit
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>{

  //everytime the app loads we want to load the user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

return (

<Provider store ={store}>

<BrowserRouter>
<Navbar />
  <Routes>
    <Route path="/" element={<Landing />}/>      
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />} />
  </Routes>
</BrowserRouter>
</Provider>

)
};

export default App;
