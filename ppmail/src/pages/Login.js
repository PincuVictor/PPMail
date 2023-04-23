import React, { useRef, useState } from 'react'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import * as IoIcons from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function Login() {
  const emailRef = useRef('')
  const passRef = useRef('')
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passRef.current.value)
      navigate('/Inbox')
    } catch {
      setError('Failed to login')
    }

    setLoading(false)
  }

  return (
    <>
    <AuthProvider>
      <div>
        <IoIcons.IoMailOutline size={70}/>
      </div>
      <Card className='mb-4'>
          <Card.Body>
            <h2 className='text-center mb-4'> Login </h2>
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
              <Button disabled = {loading} className='w-100' type='submit'>Login</Button>
            </Form>
          </Card.Body>
      </Card>
      <div className='text-center'>
        Don't have an accout? <Link to='/signup'>Sign Up</Link>
      </div>
    </AuthProvider>
    </>
  )
}

export default Login