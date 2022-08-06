import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { LoginComponent } from './components/login-page/login-component';
import { NavigationComponent } from './components/navigation-bar/navigation-component';
import { HomeComponent } from './components/home-page/home-component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/home" element= {localStorage.getItem('isAuth')? <HomeComponent />:<Navigate to="/" replace={true} />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
