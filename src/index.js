import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Private from './layout/Private';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./layout/Login/Login";
import { AuthProvider } from './context/AuthProvider';

console.log(process.env, 'env')
ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"*"} element={<Private />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
