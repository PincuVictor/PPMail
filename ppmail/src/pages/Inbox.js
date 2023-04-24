import React from 'react'
import { Container } from 'react-bootstrap'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { useAuth } from '../contexts/AuthContext'

function Inbox() {



  return (
    <>
        <Sidebar />
        <Container className='mail'>
          <strong className='d-flex align-items-center justify-content-center'>Pula</strong>
          <span className='text'>         Buba ziua, miau</span>
        </Container>
    </>
  )
}

export default Inbox