import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { UserContext } from '../global/UserContext';
import bidItem from '../services/bidItem';
import Loader from './Loader';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';
import socket from '../socket/socket';

const BidForm = ({ product }) => {
	const [bid, setBid] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [user, setUser] = useContext(UserContext);

	const handleBid = async (e) => {
		if (success) setSuccess(false);
		if (error) setError(false);
		let temp = parseInt(e.currentTarget.value);
		if (Number.isNaN(temp)) return;
		setBid(e.currentTarget.value);
	}

	const placeBid = async () => {
		setLoading(true)
		setSuccess(false);
		const [data, error] = await bidItem(bid, product._id);
		if (data) {
			setSuccess(true)
			let temp = [...user.placedBids];
			temp = temp.filter(item => item.productId?._id !== data.productId._id)
			temp.push(data);
			setUser({ ...user, placedBids:temp })
			socket.emit("bid-event", {
				by: { _id: user._id, name: user.name },
				to: product.owner._id, price: bid, product: product.title,
				data
			});
		}
		else if (error) setError(true);
		setLoading(false);
	}

	if (!user?._id) return null
	if (user?._id === product.owner._id) return null;
	return (
		<div className="place-bid">
			<div className="bid-head-sub">Bid:</div>
			<TextField
				size="medium"
				id="outlined-basic"
				margin="dense"
				label="Amount"
				autoComplete='off'
				variant="outlined"
				value={bid}
				onChange={handleBid}
			/>
			<Button
				variant="outlined"
				className='b0011'
				disabled={loading}
				onClick={placeBid} >
				Bid
			</Button>
			{loading && <Loader height={35} width={35} />}
			{success && <CheckBoxIcon color='success' />}
			{error && <ErrorIcon color='error' />}
		</div>
	)
}

export default BidForm;