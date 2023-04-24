import React from 'react'
import { Button, Container } from 'react-bootstrap'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function Inbox() {

  const {currentUser} = useAuth()
  const q = query(collection(db, 'mails'), where('recipient', '==', currentUser.email))

  async function emails(e) {
    e.preventDefault()

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          
        })
        
      }
      catch {
          console.log('nu vrea')
      }
  }


  return (
    <>
    <AuthProvider>
        <Sidebar />
        <ul>
          <Button onClick={emails} />
        </ul>      
        
    </AuthProvider>
    </>
  )
}

export default Inbox