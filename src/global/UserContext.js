import React, { useState, createContext, useRef, useEffect } from "react";
import refreshUser from './../services/refreshUser';

export const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const fetchUser = useRef();

    fetchUser.current = async () => {
      if (user && user._id) return;
      const token = localStorage.getItem("fyptoken");
      if (!token) return;
      const [data, error] = await refreshUser(token);
      if(!error) setUser({ ...data });
    }
  
    useEffect(() => {
      fetchUser.current();
    }, [])

    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;