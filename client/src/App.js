import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// importing router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {BrowserRouter as Router,Route} from 'react-router-dom';
// import Switch from "react-switch";
import React from 'react';

const App = () => (
//   <Router>
//   <Fragment>
//     <Navbar />
//     <Route exact path="/" component={Landing} />
//     <section className="container">
//       <Switch>
//         <Route exact path="/register" component={Register} />
//         <Route exact path="/login" component={Login} />
//       </Switch>
//     </section>
//   </Fragment>
//  </Router> 

<BrowserRouter>
<Navbar />
  <Routes>
    <Route path="/" element={<Landing />}/>
    {/* <section className="container"> */}
      {/* <Switch> */}
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />} />
      {/* </Switch> */}
    {/* </section> */}
  </Routes>
</BrowserRouter>
);

export default App;
