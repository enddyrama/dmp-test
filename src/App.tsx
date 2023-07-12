import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GlobalProvider } from './Context';



function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <AppRouter />
      </GlobalProvider>
    </div>
  );
}

export default App;
