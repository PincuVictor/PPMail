import React from 'react';
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Login from './pages/Login';
import Inbox from './pages/Inbox'
import { Container } from 'react-bootstrap';
import Signup from './pages/Signup';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Compose from './pages/Compose';
import IndividualEmail from './pages/IndividualEmail';

function App() {
  return (
    <> 
    <Routes>
        <Route path='/login' element={
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
        <Route path='/profile' element={
          <AuthProvider>          
            <PrivateRoute>
              <Sidebar />
              <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'  , maxWidth:'100vw'}}>
                <div className='w-100' style={{maxWidth: '400px'}}>
                  <Profile />
                </div>
              </Container>          
            </PrivateRoute>
          </AuthProvider>
        } />
        <Route path='/compose' element={
          <AuthProvider>          
            <PrivateRoute>
              <Sidebar />
              <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '90vh'  , maxWidth:'100vw'}}>
                <div className='w-100' style={{maxWidth: '800px'}}>
                  <Compose />
                </div>
              </Container>          
            </PrivateRoute>
          </AuthProvider>
        } />
      <Route path='/inbox' element={
        <AuthProvider>
          <PrivateRoute>
              <Inbox />
          </PrivateRoute>
        </AuthProvider>
      } />
      <Route path='/inbox/*' element={
        <AuthProvider>
          <PrivateRoute>
            <Sidebar />
            <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '90vh'  , maxWidth:'100vw'}}>
              <div className='w-100' style={{maxWidth: '800px'}}>
                <IndividualEmail />
              </div>
            </Container>          
          </PrivateRoute>
        </AuthProvider>
      } />
    </Routes>  
    
     

    </>
  );
}

export default App;
