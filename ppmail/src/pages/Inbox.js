import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function Inbox() {

  const {currentUser} = useAuth()
  const q = query(collection(db, 'mails'), where('recipient', '==', currentUser.email))
  var documente = []
  
  async function emails() {

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          documente = [...documente, doc.data().title]     
        })

      }
      catch {
        console.log('nu vrea')
      }
      return (
        <>
          {documente.forEach((elem) => {
            console.log(elem)
          })}
        </>
      )
    }
  useEffect(() => {emails()}, [])
    
    return (
    <>
    <AuthProvider>
        <Sidebar />
        <ul>
            <li></li>
        </ul>      
        
    </AuthProvider>
    </>
  )
}

export default Inbox