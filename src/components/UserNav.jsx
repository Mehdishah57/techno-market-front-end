import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import {UserContext} from "../global/UserContext";
import socket from '../socket/socket';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import "../styles/user-nav.scss";

const UserNav = () => {
	const navigate = useNavigate();

	const [user, setUser] = useContext(UserContext);

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
					position='relative'
					
				>
				<FavoriteBorderOutlinedIcon />
				Favourites
					{user.favourites?.length? <Box 
						position='absolute'
						backgroundColor="red"
						padding="2px"
						height="20px"
						width="20px"
						display='flex'
						justifyContent='center'
						alignItems='center'
						color='white'
						fontWeight="bold"
						borderRadius='50%'
						right='10px'
						>
						
						{user.favourites.length}
					</Box>: null}
				</Box>
			</Box>
			<Box 
				onClick={()=>navigate("/profile/my-ads")} 
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
				<CategoryOutlinedIcon />
				My Ads
				</Box>
			</Box>
			<Box 
				onClick={()=>navigate("/profile/bids")} 
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
					position="relative"
				>
				<PaidOutlinedIcon />
				Bids
				{user.placedBids?.length? <Box 
						position='absolute'
						backgroundColor="green"
						padding="2px"
						height="20px"
						width="90px"
						display='flex'
						justifyContent='center'
						alignItems='center'
						color='white'
						fontSize="13px"
						fontWeight="bold"
						borderRadius='10px'
						right='10px'
						>
						
						Placed: {user.placedBids.length}
					</Box>: null}
					{user.recievedBids?.length? <Box 
						position='absolute'
						backgroundColor="red"
						padding="2px"
						height="20px"
						width="90px"
						display='flex'
						justifyContent='center'
						alignItems='center'
						color='white'
						fontSize="13px"
						fontWeight="bold"
						borderRadius='10px'
						right='120px'
						>
						
						Recieved: {user.recievedBids.length}
					</Box>: null}
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
				onClick={()=>navigate("/profile/change-phone")} 
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
				<LocalPhoneIcon />
				Change Phone
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