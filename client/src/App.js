import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { LoginComponent } from './components/login-page/login-component';
import { NavigationComponent } from './components/navigation-bar/navigation-component';
import { HomeComponent } from './components/home-page/home-component';
import {RegisterComponent} from './components/register-page/register-component';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  const changeIsAuth = (value) => {
    setIsAuth(value);
  };

  useEffect(()=>{
    localStorage.setItem("auth", JSON.stringify(isAuth));
  }, [isAuth]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginComponent changeIsAuth={changeIsAuth} />} />
      <Route path="/register" element={<RegisterComponent changeIsAuth={changeIsAuth} />} />
      <Route path="/home" element= {isAuth? <HomeComponent />:<Navigate to="/login" replace={true} />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
