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
import {AboutUsPageComponent} from './components/aboutUs-page/aboutUs-page-component';
import { HomeComponent } from './components/home-page/home-component';
import { Basketball, Soccer, WaterSport,MartialArts, Cycling, Fitness } from './components/home-page/home-categories-service';
import {ShoppingCartComponent} from './components/shopping-cart-page/shopping-cart-component';
import {AdminComponent} from './components/admin-page/admin-page-component';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginComponent/>} />
      <Route path="/login" element={<LoginComponent/>} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/home" element= {<HomeComponent />} />
      <Route path="/soccer" element= {Soccer()} />
      <Route path="/basketball" element= {Basketball()} />
      <Route path="/watersport" element= {WaterSport()} />
      <Route path="/martialarts" element= {MartialArts()} />
      <Route path="/cycling" element= {Cycling()} />
      <Route path="/fitness" element= {Fitness()} />
      <Route path="/cart" element= {<ShoppingCartComponent />} />
      <Route path="/about" element={<AboutUsPageComponent />} />
      <Route path="/admin" element= {<AdminComponent />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
