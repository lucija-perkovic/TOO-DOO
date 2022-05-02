import React, { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './shared/components/Login';
import Header from './shared/components/Header';
import Register from './shared/components/Register';
import Home from './pages/Home';
import { AuthContext } from './shared/context/Auth/auth-context';
import { useSelector } from 'react-redux';
import { AppState } from './reducers';
import List from './pages/List';
let logoutTimer : any;
const App = () => {
  const [token, setToken] = useState<string>('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date|null>();
  const [userId, setUserId] = useState<string>('');

  const login = useCallback((token: string, userId: string, expirationDate?: Date) => {
    setToken(token);
    setUserId(userId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setTokenExpirationDate(null);
    setUserId('');
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    let storedData : any;
    if(userData) {
      storedData = JSON.parse(userData)
    }
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
    <BrowserRouter>
      <Header />
      <Routes>
        {
          token ? 
            <>
              <Route path='/login' element={<Navigate to='/home' />} />
              <Route path='/home/:id' element={<List/>}/>
              <Route path='/*' element={<Home />} />
            </>
            :
            <>
              <Route path='/home/:id' element={<List/>}/>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/*' element={<Navigate to='/login' />} />
            </>
        }
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
 
  );
};

export default App;
