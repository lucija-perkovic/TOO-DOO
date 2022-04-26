import React, { useState, useCallback } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './shared/components/Login';
import { AuthContext } from './shared/context/Auth/auth-context';
import Header from './shared/components/Header';
import Register from './shared/components/Register';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { AppState } from './reducers';

const App = () => {
  const token = useSelector((state : AppState) => state.user.token);
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/*' element={<Login/>}/>
          <Route path='/' element={token ? <Outlet /> : <Login />}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/' element={<Navigate to='/home' />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
