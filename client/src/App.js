import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { LoginComponent } from './components/login-page/login-component';
import { NavigationComponent } from './components/navigation-bar/navigation-component';
import {RegisterComponent} from './components/register-page/register-component';
import { SoccerComponent } from './components/home-page/soccer-component';
import { BasketballComponent } from './components/home-page/basketball-component';
import { MartialArtsComponent } from './components/home-page/martial-arts';
import { WaterSportComponent } from './components/home-page/water-sport';
import { CyclingComponent } from './components/home-page/cycling-component';
import { HomeComponent } from './components/home-page/home-component';
import { Basketball, Soccer, WaterSport,MartialArts, Cycling, Fitness } from './components/home-page/home-categories-service';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const changeIsAuth = (value) => {
    setIsAuth(value);
  };

  useEffect(()=>{
  }, [localStorage]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginComponent changeIsAuth={changeIsAuth} />} />
      <Route path="/register" element={<RegisterComponent changeIsAuth={changeIsAuth} />} />
      <Route path="/home" element= {localStorage.getItem('auth') == "true"? <HomeComponent />:<Navigate to="/login" replace={true} />} />
      <Route path="/home/soccer" element= {localStorage.getItem('auth') == "true"? Soccer():<Navigate to="/login" replace={true} />} />
      <Route path="/home/basketball" element= {localStorage.getItem('auth') == "true"? Basketball():<Navigate to="/login" replace={true} />} />
      <Route path="/home/watersport" element= {localStorage.getItem('auth') == "true"? WaterSport():<Navigate to="/login" replace={true} />} />
      <Route path="/home/martialarts" element= {localStorage.getItem('auth') == "true"? MartialArts():<Navigate to="/login" replace={true} />} />
      <Route path="/home/cycling" element= {localStorage.getItem('auth') == "true"? Cycling():<Navigate to="/login" replace={true} />} />
      <Route path="/home/fitness" element= {localStorage.getItem('auth') == "true"? Fitness():<Navigate to="/login" replace={true} />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
