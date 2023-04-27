import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Card } from 'react-bootstrap'

function IndividualEmail() {

    const mailRef = doc(db, 'mails', '3UMfWzoRjRf3wJcOO7Re')
    const [mailPerm, setMailPerm] = useState()
    const [loaded, setLoaded] = useState(false)

    async function fetchMail() {
        try {
            const mail = await getDoc(mailRef)
            console.log(mail.data())        
            setMailPerm(mail.data())
            setLoaded(true)
        }
        catch(error) {
            console.log(error)
        }

    }

    useEffect(() => {fetchMail()}, [])
if(loaded)
  return (
    <>
        <h2></h2>
        <Card style={{outlineStyle:'solid', outlineColor:'black'}}>
            <Card.Body>

            </Card.Body>
        </Card>
    </>
  )
}

export default IndividualEmail