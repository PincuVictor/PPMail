import React, { useRef, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import * as IoIcons from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function Signup() {
  const emailRef = useRef('')
  const passRef = useRef('')
  const passConfirmRef = useRef('')
  const { signup } = useAuth()
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (passRef.current.value !== passConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      await signup(emailRef.current.value, passRef.current.value)
    } catch {
      setError('Failed to create an account')
    }
  }

  return (
    <>
    <AuthProvider>
      <div>
        <IoIcons.IoMailOutline size={70}/>
      </div>
      <Card className='mb-4'>
          <Card.Body>
            <h2 className='text-center mb-4'> Sign Up </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email' className='mb-4'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group id='password' className='mb-4'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passRef} required />
              </Form.Group>
              <Form.Group id='password' className='mb-4'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' ref={passConfirmRef} required />
              </Form.Group>
              <Button className='w-100' type='submit'>Sign Up</Button>
            </Form>
          </Card.Body>
      </Card>
      <div className='text-center'>
        Already have an account? <Link to='/'>Login</Link>
      </div>
    </AuthProvider>
    </>
  )
}

export default Signup