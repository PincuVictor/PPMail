import React from 'react';
import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom';
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
import Sent from './pages/Sent';
import './components/Background.css'
import Trash from './pages/Trash';
import Favourites from './pages/Favourites';

function App() {
  return (
    <> 
    <Routes>
        <Route path='/' element={
          <Navigate to='/inbox'/>
        } />
        <Route path='/login' element={
          <AuthProvider>
            <Container className='background' style={{minHeight:'100%', minWidth:'100%'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh', maxWidth:'100vw'}}>
                <div className='w-100' style={{maxWidth: '400px'}}>
                  <Login />
                </div>
              </Container>
            </Container>
          </AuthProvider>
        } />
        <Route path='/signup' element={
          <AuthProvider>
            <Container className='background' style={{minHeight:'100%', minWidth:'100%'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'  , maxWidth:'100vw'}}>
                <div className='w-100' style={{maxWidth: '400px'}}>
                  <Signup />
                </div>
              </Container>
            </Container>
          </AuthProvider>
        } />
        <Route path='/profile' element={
          <AuthProvider>          
            <PrivateRoute>
              <Sidebar/>
              <Container className='background' style={{maxHeight:'100%', minWidth:'100%', overflow:'hidden', position:'fixed'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <Container className='d-flex align-items-center justify-content-center' style={{maxHeight: '100vh'  , maxWidth:'100vw'}}>
                <div className='w-100' style={{maxWidth: '400px', marginTop:'30vh'}}>
                  <Profile />
                </div>
              </Container>
              </Container>       
            </PrivateRoute>
          </AuthProvider>
        } />
        <Route path='/compose' element={
          <AuthProvider>          
            <PrivateRoute>
              <Sidebar />
              <Container className='background' style={{maxHeight:'auto', minWidth:'100%', overflow:'hidden', position:'fixed'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '90vh'  , maxWidth:'100vw'}}>
                <div className='w-100' style={{maxWidth: '800px'}}>
                  <Compose />
                </div>
              </Container>  
              </Container>        
            </PrivateRoute>
          </AuthProvider>
        } />
      <Route path='/inbox' element={
        <AuthProvider>
          <PrivateRoute>
            <Container className='background' style={{maxHeight:'auto', minWidth:'100%', overflow:'hidden', position:'fixed'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Container>
            <Inbox />
          </PrivateRoute>
        </AuthProvider>
      } />
      <Route path='/sent' element={
        <AuthProvider>
          <PrivateRoute>
          <Container className='background' style={{maxHeight:'auto', minWidth:'100%', overflow:'hidden', position:'fixed'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Container>
              <Sent />
          </PrivateRoute>
        </AuthProvider>
      } />
      <Route path='/favourites' element={
        <AuthProvider>
          <PrivateRoute>
          <Container className='background' style={{maxHeight:'auto', minWidth:'100%', overflow:'hidden', position:'fixed'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Container>
              <Favourites />
          </PrivateRoute>
        </AuthProvider>
      } />
      <Route path='/trash' element={
        <AuthProvider>
          <PrivateRoute>
          <Container className='background' style={{maxHeight:'auto', minWidth:'100%', overflow:'hidden', position:'fixed'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Container>
              <Trash />
          </PrivateRoute>
        </AuthProvider>
      } />
      <Route path='/inbox/*' element={
        <AuthProvider>
          <PrivateRoute>
            <Sidebar />
            <Container className='background' style={{maxHeight:'auto', minWidth:'100%', overflow:'hidden', position:'fixed'}}>
              <ul className='circles'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Container>
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
