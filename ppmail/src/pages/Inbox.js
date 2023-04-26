import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Inbox() {

  const {currentUser} = useAuth()
  const q = query(collection(db, 'mails'), where('recipient', '==', currentUser.email))
  const documente = useState([{id: 'asdasdasd',
    title: 'biribagu',
    sender: 'pincu.victor@ppmail.com',
    recipient: 'pincu.victor@ppmail.com',
    createdAt: 'pula',
    text: 'e'
  }])
  
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
      }
      catch {
        console.log('no work')
      }
      setDocumentePerm(documente)
    }

  useEffect(() => {emails()}, [])
    console.log(documentePerm[2].text)
    return (
    <>
    <AuthProvider>
        <Sidebar />
        <div>{}</div>
    </AuthProvider>
    </>
  )
}

export default Inbox