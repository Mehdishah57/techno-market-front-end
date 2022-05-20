import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from "../../global/UserContext";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ item }) => {
	const [count,setCount] = useState(0);
	const [user] = useContext(UserContext);
	const messageCount = useRef(null);

	const navigate = useNavigate();
	
	let other = user._id === item.idOne._id.toString() ? item.idTwo : item.idOne;

	const handleClick = () => navigate(`${item._id}`)

	messageCount.current = () => {
		if(!user?.notifications) return;
		const newMessage = user.notifications.find( item => item.id === other._id);
		if(!newMessage) return;
		setCount(newMessage.count);
	}

	useEffect(()=>{
		messageCount.current()
	},[count])
	
	return (
		<div onClick={handleClick} className="list-item-wrapper">
			<Avatar alt={other.name} src={other.image?.url} />
			<div className='name'>{other.name}</div>
			<div className='message'>{item.messages[0]?.message}</div>
			{count ? <div className="count">{count}</div>: null}
		</div>
	)
}

export default ListItem