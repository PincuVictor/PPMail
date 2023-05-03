import React, {useEffect, useState} from 'react'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Sent() {
  
    const {currentUser} = useAuth()
  
    const documente = useState([{id: '',
      title: '',
      sender: '',
      recipient: '',
      createdAt: '',
      text: ''
    }])
    const [loaded, setLoaded] = useState(false)
    const [documentePerm, setDocumentePerm] = useState([{id: '',
      title: '',
      sender: '',
      recipient: '',
      createdAt: '',
      text: ''
    }])
    const q = query(collection(db, 'mails'), where('sender', '==', currentUser.email))
    async function emails() {
  
        try {
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {
            documente.push({
              id: doc.id,
              title: doc.data().title,
              sender: doc.data().sender,
              recipient: doc.data().recipient,
              createdAt: doc.data().createdAt,
              text: doc.data().text
            })
          })
          setLoaded(true)
        }
        catch(error) {
          console.log(error)
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
                    <Link to={'/inbox/' + mail.id} style={{color:'#000', textDecoration:'none'}}>
                      <Container className='mail-container'>
                        <span className='mail-text'> <strong className='mail-title'> {mail.title} </strong><span>         </span> {mail.text}</span>
                      </Container>
                    </Link>
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

export default Sent