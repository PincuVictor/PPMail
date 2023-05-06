import React, {useEffect, useState} from 'react'
import '../components/Inbox.css'
import Sidebar from "../components/sidebar"
import { collection, query, where, getDocs, setDoc, doc, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Trash() {

  const {currentUser} = useAuth()
  var pages = 1
  var trashMails = 0
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
  const q = query(collection(db, 'mails'), where('recipient', '==', currentUser.email), orderBy('createdAt', 'desc'))
  async function emails() {

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            if(doc.data().trash === true)
                trashMails++
    
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
    if(trashMails > 19)
        pages = ( trashMails / 2 - 1) / 20
    else
        pages = 1
    pages = Math.ceil(pages)
    return (
    <>
    <AuthProvider>
        <Sidebar />
        <ul className='mails'>
          {documentePerm.map((mail, index) => {
            if( ( (index > 1 && index > ( currPage - 1 ) * 20) && (index <= currPage * 20 && index < documentePerm.length / 2 + 1) ) && mail.trash === true)
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
        <Container style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
          <Button onClick={() => {
            if(currPage > 1) {
              setCurrPage(currPage - 1)              
            }
          }}/>
          <span>Page {currPage} of {pages}</span>
          <Button onClick={() => {
            if(currPage < pages) {
              setCurrPage(currPage + 1)
            }
          }}/>
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