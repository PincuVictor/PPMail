import React, { useRef } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as IoIcons from 'react-icons/io5'

function Login() {
  const emailRef = useRef()
  const passRef = useRef()
  return (
    <>
    <div>
      <IoIcons.IoMailOutline size={70}/>
    </div>
    <Card className='mb-4'>
        <Card.Body>
          <h2 className='text-center mb-4'> Login</h2>
          <Form>
            <Form.Group id='email' className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password' className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passRef} required />
            </Form.Group>
            <Button className='w-100' type='submit'>Login</Button>
          </Form>
        </Card.Body>
    </Card>
    <div className='text-center'>
      Don't have an account? <Link to='/signup'>Sign Up</Link>
    </div>
    </>
  )
  }

export default Login