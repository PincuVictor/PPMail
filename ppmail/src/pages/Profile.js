import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

function Profile() {

    const [error, setError] = useState('')
    //const { currentUser } = useAuth()

    function handleLogout() {

    }

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <strong>Email - </strong>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>Log Out</Button>
    </div>
    </>
  )
}

export default Profile