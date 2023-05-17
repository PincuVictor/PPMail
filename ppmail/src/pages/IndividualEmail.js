import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Card, Alert } from 'react-bootstrap'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import '../components/IndividualEmail.css'

function IndividualEmail() {
    const {currentUser} = useAuth()
    const mailRef = doc(db, 'mails', window.location.href.slice(-20))
    const [mailPerm, setMailPerm] = useState()
    const [loaded, setLoaded] = useState(false)

    async function fetchMail() {
        try {
            const mail = await getDoc(mailRef)
            setMailPerm(mail.data())
            setLoaded(true)
        }
        catch(error) {
            console.log(error)
        }

    }

    useEffect(() => {fetchMail()}, [])

    var date = new Date()

    if(loaded) {
        date = new Date(mailPerm.createdAt.seconds * 1000 + mailPerm.createdAt.nanoseconds / 1000000)
        date = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date)
    }

if(loaded) {
    if(currentUser.email === mailPerm.recipient)
    return (
            <>
            <AuthProvider>
                <h2>{mailPerm.title}</h2>
                <Card className='container' style={{marginBottom:'4px', background:'inherit', boxShadow:'0 0 1rem 0 rgba(0, 0, 0, .2)'}}>
                    <Card.Body className='body'>
                        <span>From: {mailPerm.sender}</span>
                        {<span>Sent At: {date.toString()}</span>}
                        <span className='mt-2'>{mailPerm.text}</span>
                    </Card.Body>
                </Card>
            </AuthProvider>
            </>
        )
        else
            if(currentUser.email === mailPerm.sender)
            return (
                    <>
                    <AuthProvider>
                        <h2>{mailPerm.title}</h2>
                        <Card className='container'>
                            <Card.Body className='body'>
                                <span>To: {mailPerm.recipient}</span>
                                {<span>Sent At: {date.toString()}</span>}
                                <span style={{marginTop:'5px'}}>{mailPerm.text}</span>
                            </Card.Body>
                        </Card>
                    </AuthProvider>
                    </>
                )
                else
                return (
                    <>
                        <Alert variant='danger'>You don't have the permissions to view this email!</Alert>
                    </>
                )
}
else
return (
    <>
            <div>Loading...</div>
        </>
    )
}

export default IndividualEmail