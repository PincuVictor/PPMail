import React, {useEffect, useState} from 'react'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

function Trash() {

  const {currentUser} = useAuth()
  var pages = 1
  const [currPage, setCurrPage] = useState(1)
  const [loads, setLoads] = useState(0)
  const [render, setRender] = useState(false)

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
  const q = query(collection(db, 'mails'), where('recipient', '==', currentUser.email), where('trash', '==', true), orderBy('createdAt', 'desc'))
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
        setLoads(loads + 1)
        if(loads === 1)
          setLoaded(true)
        setRender(true)
      }
      catch(error) {
        console.log(error)
      }
      setDocumentePerm(documente)
    }

    useEffect(() => {emails()}, [render])
  if (loaded) {
    pages = ( documentePerm.length - 2 ) / 15
    pages = Math.ceil(pages)
    return (
    <>
    <AuthProvider>
        <strong style={{display:'flex', justifyContent:'center', alignItems:'center', color:'#FFF', fontSize:'32px', zIndex:5, marginTop:13, marginBottom:-63}}>Trash Bin</strong>
        <Sidebar />
        <ul className='mails'>
          {documentePerm.map((mail, index) => {
            if((index > 1 && index > ( currPage - 1 ) * 15) && (index <= currPage * 15 && index < documentePerm.length))
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
          <span>Page {currPage} of {pages}</span>
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

export default Trash