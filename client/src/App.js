import './App.css';
import React, { useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from './Components/register';
import Login from './Components/login';
import MyProfile from './Components/myProfile';

export const store=createContext();


function App() {
  const [token,setToken]=useState(null);


  return (
    <div className="App">
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
      <Routes>
      <Route path='/' Component={Register} />
        <Route path='/register' Component={Register} />
        <Route path='/login' Component={Login} />
        <Route path='/profile' Component={MyProfile} />
      </Routes>
        
      </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
