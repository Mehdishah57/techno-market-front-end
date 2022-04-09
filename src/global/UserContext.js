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
    if (!error) setUser({ ...data });
    if(!error) return socket.emit("joinMyId",data._id);
    localStorage.removeItem("fyptoken");
  }

  socket.off("notification").on('notification', (data)=>{
    toast.success(`${data.name}: ${data.message}`,{duration: 5000})
  })

  useEffect(() => {
    fetchUser.current();
  }, [])

  return <UserContext.Provider value={[user, setUser]}>
    <Toaster />
    {children}
  </UserContext.Provider>
}

export default UserProvider;