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
          
        </Container>
    </>
  )
}

export default Inbox