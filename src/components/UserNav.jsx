import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import {UserContext} from "../global/UserContext";
import socket from '../socket/socket';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

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
			overflow="hidden"
		>
			<Box 
				onClick={()=>navigate("/profile/favourites")} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"

			>
				<Box 
					display='flex' 
					justifyContent="flex-start" 
					alignItems="center" 
					flexDirection="row"
					gap="10px"
				>
				<FavoriteBorderOutlinedIcon />
				Favourites
				</Box>
			</Box>
			<Box 
				onClick={()=>navigate("/messages")} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"
			>
				<Box 
					display='flex' 
					justifyContent="flex-start" 
					alignItems="center" 
					flexDirection="row"
					gap="10px"
				>
				<EmailOutlinedIcon />
				Messages
				</Box>
			</Box>
			<Box 
				onClick={()=>navigate("/sell")} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"
			>
				<Box 
					display='flex' 
					justifyContent="flex-start" 
					alignItems="center" 
					flexDirection="row"
					gap="10px"
				>
				<AddCircleOutlineOutlinedIcon />
				Post an ad
				</Box>
			</Box>
			<Box 
				onClick={handleLogout} 
				width='100%' padding='10px' 
				borderBottom='1px solid black'
				className="usernav-menu-item"
			>
				<Box 
					display='flex' 
					justifyContent="flex-start" 
					alignItems="center" 
					flexDirection="row"
					gap="10px"
				>
				<LogoutIcon />
				Logout
				</Box>
			</Box>
		</Box>
	)
}

export default UserNav