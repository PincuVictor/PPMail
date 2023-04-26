import React, {useEffect, useState} from 'react'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Container } from 'react-bootstrap'

function Inbox() {

  const {currentUser} = useAuth()
  const q = query(collection(db, 'mails'), where('recipient', '==', currentUser.email))
  const documente = useState([{id: 'asdasdasd',
    title: 'biribagu',
    sender: 'pincu.victor@ppmail.com',
    recipient: 'pincu.victor@ppmail.com',
    createdAt: 'candva',
    text: 'e'
  }])
  const [loaded, setLoaded] = useState(false)
  const [documentePerm, setDocumentePerm] = useState([{id: '',
    title: '',
    sender: '',
    recipient: '',
    createdAt: '',
    text: ''
  }])
  
  async function emails() {

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          documente.push(doc.data())
        })
        setLoaded(true)
      }
      catch {
        console.log('nu merge')
      }
      setDocumentePerm(documente)
    }

    useEffect(() => {emails()}, [])

  if (loaded) {
    return (
    <>
    <AuthProvider>
        <Sidebar />
        <ul className='mails'>
          {documentePerm.map((mail, index) => {
            if(index > 1 && index < documentePerm.length / 2 + 1)
              return (
                <li key={index} className='mail'>
                  <Container className='mail-container'>
                  <span className='mail-text'> <strong className='mail-title'> {mail.title} </strong><span>         </span> {mail.text}</span>
                  </Container>
                </li>
              )
        })}
        </ul>
    </AuthProvider>
    </>
  )
}
  else {
    return (
      <>
        <Sidebar />
        <strong>Loading...</strong>
      </>
    )
}

}

export default Inbox