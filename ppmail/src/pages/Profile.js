import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
          await logout()
          navigate('/login')
        } catch {
          setError('Failed to log out')
        }
    }

  return (
    <>
    <AuthProvider>
    <Card style={{marginBottom:'4px', background:'inherit', boxShadow:'0 0 1rem 0 rgba(0, 0, 0, .2)'}}>
        <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <strong>Email - </strong>{currentUser && currentUser.email}
        </Card.Body>
    </Card>
    <div style={{display:'flex', justifyContent:'center'}}>
        <Button variant='link' style={{color: '#171e80', zIndex:'5'}} onClick={handleLogout}>Log Out</Button>
    </div>
    </AuthProvider>
    </>
  )
}

export default Profile