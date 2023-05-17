import React, {useEffect, useState} from 'react'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc, orderBy, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Button, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { AiFillStar, AiOutlineLeft, AiOutlineRight, AiOutlineStar } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'

function Inbox() {

  const {currentUser} = useAuth()
  var pages = 1
  const [loads, setLoads] = useState(0)
  const [render, setRender] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [component, setComponent] = useState({
    state: false,
    id: ''
  })

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
  const q = query(collection(db, 'mails'), where('recipient', '==', currentUser.email), orderBy('createdAt', 'desc'))

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

    async function modifyDocTrash(id) {
      try {
        const docRef = doc(db, 'mails', id)
        await updateDoc(docRef, { trash: true })
      }
      catch(error) {
        console.log(error)
      }
    }
    async function modifyDocFavouriteTrue(id) {
      try {
        const docRef = doc(db, 'mails', id)
        await updateDoc(docRef, { favourite: true })
      }
      catch(error) {
        console.log(error)
      }
    }
    async function modifyDocFavouriteFalse(id) {
      try {
        const docRef = doc(db, 'mails', id)
        await updateDoc(docRef, { favourite: false })
      }
      catch(error) {
        console.log(error)
      }
    }

    useEffect(() => {emails()}, [render])

  if (loaded) {
    
    pages = ( documentePerm.length - 2) / 15
    pages = Math.ceil(pages)

    return (
    <>
    <AuthProvider>
        <strong style={{display:'flex', justifyContent:'center', alignItems:'center', color:'#FFF', fontSize:'32px', zIndex:5, marginTop:13, marginBottom:-63}}>Inbox</strong>
        <Sidebar />
        
        {component.state ? 
        <Card style={{marginLeft:'40vw', marginTop:'20vh' ,width:'20vw', height:'20vh', zIndex:10, backgroundColor:'#8f94fb', boxShadow:'0 0 1rem 0 rgba(0, 0, 0, .8)', position:'absolute'}}>
          <Card.Body style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2 className='mb-4'>Confirm Deletion</h2>
            <span>Are you sure you wish to delete this document?</span>
            <div style={{display:'flex', marginTop:40}}>
            <Button style={{marginRight:20}} onClick={() => {
              setComponent({
                state: !component.state,
                id: ''
              })}}>Cancel</Button>
            <Button style={{backgroundColor:'darkred'}} onClick={() => {
              modifyDocTrash(component.id)
              setComponent({
                state: !component.state,
                id: ''
              })
              setRender(!render)
              }}>Delete</Button>
            </div>
          </Card.Body>
        </Card> : null}

        <ul className='mails'>
          {documentePerm.map((mail, index) => {
            if( ( (index > 1 && index > ( currPage - 1 ) * 15) && (index <= currPage * 15 && index < documentePerm.length) ) && mail.trash === false)
              return (
                <li key={index} className='mail'>
                  <Container style={{display:'flex', justifyContent:'center'}}>
                    <Link to={'/inbox/' + mail.id} style={{color:'#000', textDecoration:'none'}}>
                      <Container>
                        <span className='mail-text'> <strong className='mail-title'> {mail.title} </strong><span>         </span> {mail.text}</span>
                      </Container>
                    </Link>                    
                    <IconButton onClick={() => {
                      setComponent({
                        state: !component.state,
                        id: mail.id
                      })}}> <FaTrash /> </IconButton>
                    {!mail.favourite ? <IconButton onClick={() => {modifyDocFavouriteTrue(mail.id)
                      setRender(!render)
                    }}> 
                    <AiOutlineStar /> </IconButton> : <IconButton onClick={() => {modifyDocFavouriteFalse(mail.id)
                      setRender(!render)
                    }}> <AiFillStar /> </IconButton>}
                  </Container>                    
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

export default Inbox