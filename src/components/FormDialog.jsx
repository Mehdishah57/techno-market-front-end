import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import sendMessage from '../services/sendMessage';
import toast, { Toaster } from 'react-hot-toast';
import socket from '../socket/socket';
import { UserContext } from '../global/UserContext';

export default function FormDialog({ open, setOpen, title, description, id }) {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [user] = useContext(UserContext);

	const handleChange = e => setMessage(e.currentTarget.value);

	const handleClose = () => setOpen(false);

	const handleSend = async () => {
		socket.emit("message", { id: id, message, name: user.name, sender: user._id })
		setLoading(true);
		const [data] = await sendMessage(id, message);
		setLoading(false);
		if (data) toast.success(data) && setOpen(false);
		else toast.error("We couldn't send your message! 😢😢😢");
	}

	return (
		<div>
			<Toaster />
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{description}
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						value={message}
						label="Send a message"
						type="text"
						onChange={handleChange}
						fullWidth
						disabled={loading}
						variant="filled"
						autoComplete='off'
					/>
				</DialogContent>
				<DialogActions>
					<Button disabled={loading} onClick={handleClose}>Cancel</Button>
					<Button variant="contained" disabled={loading} onClick={handleSend}>Message</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
