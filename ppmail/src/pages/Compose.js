import React, { useRef, useState } from 'react'
import { Button, Card, Alert, Form } from 'react-bootstrap'
import { db } from '../firebase'
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function Compose() {

    const emailRef = useRef('')
    const titleRef = useRef('')
    const textRef = useRef('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const mailsRef = collection(db, 'mails')
    const { currentUser } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setSuccess('Email sent successfully!')
            setError('')
            await setDoc(doc(mailsRef), {
                sender: currentUser.email,
                recipient: emailRef.current.value,
                title: titleRef.current.value,
                text: textRef.current.value,
                createdAt: Timestamp.fromDate(new Date()),
                trash: false,
                favourite: false
            })
        }
         catch {
            setSuccess('')
            setError('Failed to send email!')
         }   
    }

  return (
    <>
    <AuthProvider>
        <h2>Compose</h2>
        <Card style={{marginBottom:'4px', background:'inherit', boxShadow:'0 0 1rem 0 rgba(0, 0, 0, .2)'}}>
            <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                {success && <Alert variant='success'>{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email' className='mb-4'>
                        <Form.Label>To:</Form.Label>
                        <Form.Control type='email' ref={emailRef} required className='w-50' style={{background:'transparent', borderColor:'black'}} placeholder='The recipient'/>
                    </Form.Group>
                    <Form.Group id='title' className='mb-4'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type='text' ref={titleRef} required className='w-50' style={{background:'transparent', borderColor:'black'}} placeholder='Subject'/>
                    </Form.Group>
                    <Form.Group id='body'>
                        <Form.Label>Text:</Form.Label>  
                        <Form.Control as='textarea' ref={textRef} rows='10' required style={{background:'transparent', borderColor:'black'}}    />
                    </Form.Group>
                    <Button type='submit' className='w-40 mt-4' style={{float:'right'}}>Send</Button>
                </Form>
            </Card.Body>
        </Card>
    </AuthProvider>
    </>
  )
}

export default Compose