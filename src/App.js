import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import { onSnapshot, collection, doc, query, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import Message from './Message';
import FlipMove from 'react-flip-move';
import IconButton from '@mui/material/IconButton';
import { SendRounded } from '@material-ui/icons';

function App() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // run once when the app component loads
    // every time db changes this piece of code runs
    // db.collection('messages').onSnapshot(snapshot => {
    //   setMessages(snapshot.docs.map(doc => doc.data()))
    // })

    const collectionRef = collection(db, 'messages')
    const q = query(collectionRef, orderBy("timestamp", "desc"))

    const unsub = onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])


  useEffect(() => {
    // run code here... 
    setUserName(prompt('please enter your name'))

  }, [])  // condition


  // if its blank [], it only loads ONCE when app components loads
  // if it has [input], it will run whenever input state changes


  const messageCollectionRef = collection(db, 'messages')

  const sendMessage = async (e) => {

    // all the logic to send the msg goes here

    // disables refresh
    e.preventDefault()

    await addDoc(messageCollectionRef, {
      message: input,
      username: userName,
      timestamp: serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="App">
      <img src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'  />
      <h1>hello {userName}</h1>

      <form className='app__form'>
        <FormControl className='app__formControl'>
          <InputLabel>enter a message</InputLabel>
          <Input className='app__input' placeholder='enter a message...' value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className='app__icon' onClick={sendMessage} disabled={!input} variant='contained' color='primary' type='submit'>
            <SendRounded />
          </IconButton>
        </FormControl>

      </form>

      <FlipMove>
        {
          messages.map(({message, id}) => (
            <Message message={message} userName={userName} key={id} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
