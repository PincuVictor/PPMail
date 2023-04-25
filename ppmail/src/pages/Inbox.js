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
  const documente = useState([])
  
  async function emails() {

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          documente.push({
            id: doc.id,
            title: doc.data().title,
            sender: doc.data().sender
          })
          console.log(documente.title)
        })

      }
      catch {
        console.log('no work')
      }

    }

  useEffect(() => {emails()}, [])
    
    return (
    <>
    <AuthProvider>
        <Sidebar />
        {console.log(documente)}
    </AuthProvider>
    </>
  )
}

export default Inbox