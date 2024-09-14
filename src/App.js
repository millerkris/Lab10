import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Home';
import IdInputForm from './components/IdInputForm';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>My App</Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/idInputForm">API</Button>
        </Toolbar>
      </AppBar>

      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/idInputForm" element={<IdInputForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
