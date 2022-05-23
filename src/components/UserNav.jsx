import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import {UserContext} from "../global/UserContext";
import socket from '../socket/socket';

import "../styles/user-nav.scss";

const UserNav = () => {
	const navigate = useNavigate();

	const [, setUser] = useContext(UserContext);

	const handleLogout = () => {
		navigate("/login");
		setUser({});
		socket.disconnect();
	}

	return (
		<Box 
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
			width='100%'
			maxWidth="600px"
			margin="10px"
			borderRadius='10px'
			border='1px solid black'
		>
			<Box 
				onClick={()=>navigate("/profile/favourites")} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"

			>
				Favourites
			</Box>
			<Box 
				onClick={()=>navigate("/messages")} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"
			>
				Messages
			</Box>
			<Box 
				onClick={()=>navigate("/sell")} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"
			>
				Post an ad
			</Box>
			<Box 
				onClick={handleLogout} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"
			>
				Logout
			</Box>
		</Box>
	)
}

export default UserNav