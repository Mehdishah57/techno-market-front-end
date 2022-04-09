import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from "../components/Messages/List";
import Chat from "../components/Messages/Chat";

const Messages = () => {
    return <Routes>
        <Route path='/' element={<List />}/>
        <Route path=':id' element={<Chat />} />
    </Routes>
}
 
export default Messages;