import React from 'react';
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Inbox from './pages/Inbox'
import { Container } from 'react-bootstrap';
import Signup from './pages/Signup';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/Profile';

function App() {
  return (
    <> 
    <Routes>
        <Route path='/' element={
          <AuthProvider>
            <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh', maxWidth:'100vw'}}>
              <div className='w-100' style={{maxWidth: '400px'}}>
                <Login />
              </div>
            </Container>
          </AuthProvider>
        } />
        <Route path='/signup' element={
          <AuthProvider>
            <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'  , maxWidth:'100vw'}}>
              <div className='w-100' style={{maxWidth: '400px'}}>
                <Signup />
              </div>
            </Container>
          </AuthProvider>
        } />
      <Route path='/inbox' element={<Inbox />}/>
      <Route path='/profile' element={<Profile />}/>
    </Routes>  
    
     

    </>
  );
}

export default App;
