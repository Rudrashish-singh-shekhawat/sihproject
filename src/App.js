import React from 'react';
import "./App.css";
import Btnav from "./component/bottomnav";
import Nav from "./component/navbar";
import { Routes,Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard"
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login'
import Signup from './pages/signup';
import Account from "./pages/account";


function App() {

  return (
    <>
        <Nav/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/account' element={<Account/>}/>
       </Routes>
    </>
  );
}

export default App;
