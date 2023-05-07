import React, {useEffect, useState} from 'react'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

function Sent() {
  
    const {currentUser} = useAuth()
    var pages = 1
    const [currPage, setCurrPage] = useState(1)

    const documente = useState([{id: '',
      title: '',
      sender: '',
      recipient: '',
      createdAt: '',
      text: '',
      trash: '',
      favourite: ''
    }])
    const [loaded, setLoaded] = useState(false)
    const [documentePerm, setDocumentePerm] = useState([{id: '',
      title: '',
      sender: '',
      recipient: '',
      createdAt: '',
      text: '',
      trash: '',
      favourite: ''
    }])
    const q = query(collection(db, 'mails'), where('sender', '==', currentUser.email), orderBy('createdAt', 'desc'))
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
              text: doc.data().text,
              trash: doc.data().trash,
              favourite: doc.data().favourite
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
      pages = ( documentePerm.length / 2 - 1 ) / 20
      pages = Math.ceil(pages)
      return (
      <>
      <AuthProvider>
          <strong style={{display:'flex', justifyContent:'center', alignItems:'center', color:'#FFF', fontSize:'32px', zIndex:5, marginTop:13, marginBottom:-63}}>Sent</strong>
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
          <Container style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
            <IconButton onClick={() => {
              if(currPage > 1) {
                setCurrPage(currPage - 1)              
              }
            }} > <AiOutlineLeft /> </IconButton>
            <span style={{padding:'5 5 5 5'}}>Page {currPage} of {pages}</span>
            <IconButton onClick={() => {
              if(currPage < pages) {
                setCurrPage(currPage + 1)
              }
            }} style={{marginLeft:'1rem'}}> <AiOutlineRight /> </IconButton>
          </Container>
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