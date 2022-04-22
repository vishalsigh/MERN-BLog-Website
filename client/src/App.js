import React from 'react';
import Router from './Router';
import axios from 'axios';
import { AuthContextProvider } from './components/context/AuthContext';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
    );
}

export default App;
