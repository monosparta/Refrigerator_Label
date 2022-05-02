import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import App from './App.js';
import Load from './Pages/LoadingPage';
import Login from './Pages/LoginPage';
import Management from './Pages/ManagementPage';
import NoFoundPage from './Pages/NotFoundPage';

// const token = localStorage.getItem("login_token");

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={ <Login/> }/>
      <Route path="/ManagementPage" element={ <Management/> }/>
      <Route path="*" element={<NoFoundPage/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
