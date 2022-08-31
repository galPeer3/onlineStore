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

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginComponent/>} />
      <Route path="/login" element={<LoginComponent/>} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/home" element= {<HomeComponent />} />
      <Route path="/home/soccer" element= {Soccer()} />
      <Route path="/home/basketball" element= {Basketball()} />
      <Route path="/home/watersport" element= {WaterSport()} />
      <Route path="/home/martialarts" element= {MartialArts()} />
      <Route path="/home/cycling" element= {Cycling()} />
      <Route path="/home/fitness" element= {Fitness()} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
