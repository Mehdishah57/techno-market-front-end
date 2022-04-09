import React, { useContext } from 'react';
import { UserContext } from "../../global/UserContext";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ item }) => {
	const [user] = useContext(UserContext);

	const navigate = useNavigate();
	
	let other = user._id === item.idOne._id.toString() ? item.idTwo : item.idOne;

	const handleClick = () => navigate(`${item._id}`)
	
	return (
		<div onClick={handleClick} className="list-item-wrapper">
			<Avatar alt={other.name} src={other.image?.url} />
			<div className='name'>{other.name}</div>
			<div className='message'>{item.messages[0]?.message}</div>
		</div>
	)
}

export default ListItem