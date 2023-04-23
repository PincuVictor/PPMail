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
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <strong>Email - </strong>{currentUser && currentUser.email}
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>Log Out</Button>
    </div>
    </AuthProvider>
    </>
  )
}

export default Profile