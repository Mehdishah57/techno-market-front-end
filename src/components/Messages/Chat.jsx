import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../../global/UserContext';
import getChat from '../../services/getChat';
import { Toaster, toast } from "react-hot-toast";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Loader from '../Loader';
import sendMessage from '../../services/sendMessage';
import socket from '../../socket/socket';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';

import "../../styles/Messages/chat.scss";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [chat, setChat] = useState({ messages: [] });
  const fetchChat = useRef(null);
  const divRef = useRef(null);
  const scrollToBottom = useRef(null);
  const { id } = useParams();

  scrollToBottom.current = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" })
    console.log(divRef.current?.scrollIntoView)
  }

  fetchChat.current = async () => {
    const [data, error] = await getChat(id);
    if (error) toast.error("We couldn't fetch your messages! 😥😥😥");
    else setChat(data);
    console.log(error?.response?.data || JSON.stringify(error))
    setLoading(false);
    let otherUser = data?.idOne._id.toString() === user._id ? data?.idTwo._id.toString() : data?.idOne._id.toString();
    socket.off("notification").on("notification", data => {
      if (data.sender === otherUser) return;
      toast.success(`${data.name}: ${data.message}`, { duration: 5000 })
    })
  }

  useEffect(() => {
    fetchChat.current();

    return () => {
      socket.off("notification").on("notification", data => {
        let temp = user.notifications ? [...user.notifications] : [];
        const notification = temp.find(item => item.id === data.sender);
        if (!notification) temp.push({ id: data.sender, count: 1 });
        else {
          notification.count++;
          temp = temp.filter(item => item.id !== notification.sender);
          temp.push(notification);
        }
        setUser({ ...user, notifications: temp });
        toast.success(`${data.name}: ${data.message}`, { duration: 5000 })
      })
      socket.off("user-message");
    }
  }, [])

  useEffect(() => {
    scrollToBottom.current();
  }, [chat])

  useEffect(() => {
    if (chat.messages.length) {
      socket.off("user-message").on("user-message", data => {
        let temp = [];
        for (let i = 0; i < chat.messages.length; i++) {
          temp.push({ by: chat.messages[i].by, message: chat.messages[i].message })
        }
        temp.push({ by: data.sender, message: data.message });
        setChat({ ...chat, messages: temp });
      })
    }
  }, [chat])

  const handleSubmit = async () => {
    let otherUser = chat.idOne._id.toString() === user._id ? chat.idTwo._id.toString() : chat.idOne._id.toString();
    const [, error] = await sendMessage(otherUser, message);
    if (error) return toast.error("We are unable to deliever your message! 😗😗😗");
    socket.emit("message", { id: otherUser, message, name: user.name, sender: user._id })
    setMessage("");
  }

  if (loading) return <div className="chat-wrapper">
    <Loader height={50} width={50} />
  </div>
  return (
    <div className="chat-wrapper">
      <Toaster />
      <div ref={divRef} className='text-wrapper'>
        {chat.messages.map((item, index) => item.by === user._id ?
          <div className='message-item'>
            <Avatar alt={user.name} src={user?.image?.url} />
            <div key={index} className="my">
              {item.message}
            </div>
          </div> :
          <div className='message-item-2'>
            <div key={index} className="his">{item.message}</div>
            <Avatar alt={user.name} src={user._id === chat.idOne._id ? chat.idTwo?.image?.url : chat.idOne?.image?.url} />
          </div>)}
      </div>
      <div className='message-input'>
        <TextField
          margin="dense"
          id="name"
          value={message}
          label="Send a message"
          type="text"
          onChange={e => setMessage(e.currentTarget.value)}
          fullWidth
          variant="filled"
          autoComplete='off'
        />
        <Button onClick={handleSubmit} sx={{ height: "100%" }} variant='contained'><SendIcon /></Button>
      </div>
    </div>
  )
}

export default Chat