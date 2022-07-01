import React, { useState, createContext, useRef, useEffect } from "react";
import socket from "../socket/socket";
import refreshUser from './../services/refreshUser';
import { Toaster, toast } from "react-hot-toast";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const fetchUser = useRef();

  fetchUser.current = async () => {
    if (user && user._id) return;
    const token = localStorage.getItem("fyptoken");
    if (!token) return;
    const [data, error] = await refreshUser(token);
    console.log(data)
    if (!error) setUser(data);
    if(!error) return socket.emit("joinMyId",data._id);
    localStorage.removeItem("fyptoken");
  }

  useEffect(()=>{
    socket.off("bid-recieved").on("bid-recieved", data => {
      toast.success(`${data.by.name} placed a bid of ${data.price} on ${data.product}`,{duration:6000})
      let bid = data.data;
		  let temp = [...user.recievedBids];
      temp = temp.filter(item => item._id !== bid._id)
		  temp.push(bid);
		  setUser({...user, recievedBids: temp})
    })
  
    socket.off("notification").on('notification', (data)=>{
      let temp = user.notifications ? [...user.notifications] : [];
      const notification = temp.find(item => item.id === data.sender);
      if(!notification) temp.push({id: data.sender, count:1});
      else {
        notification.count++;
        temp = temp.filter(item => item.id !== notification.sender);
        temp.push(notification);
      }
      setUser({...user, notifications: temp});
      toast.success(`${data.name}: ${data.message}`,{duration: 5000})
    })
  },[user])

  useEffect(() => {
    fetchUser.current();
  }, [])

  return <UserContext.Provider value={[user, setUser]}>
    <Toaster />
    {children}
  </UserContext.Provider>
}

export default UserProvider;