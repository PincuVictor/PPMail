import React from 'react';
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <> 
    <Routes>
      <Route path='/' element={<Sidebar />} />
      <Route path='/bin' element={<h1>Hello</h1>}/>
    </Routes>  
    
     

    </>
  );
}

export default App;
