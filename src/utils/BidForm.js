import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { UserContext } from '../global/UserContext';
import bidItem from '../services/bidItem';
import Loader from '../components/Loader';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';

const BidForm = ({ product }) => {
	const [bid, setBid] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [user] = useContext(UserContext);

	const handleBid = async (e) => {
		try {
			if(success) setSuccess(false);
			if(error) setError(false);
			parseInt(e.currentTarget.value);
			setBid(e.currentTarget.value);
		} catch (error) { }
	}

	const placeBid = async () => {
		setLoading(true)
		setSuccess(false);
		const [data, error] = await bidItem(bid, product._id);
		if (data) setSuccess(true);
		else if(error) setError(true);
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
			{error && (<><ErrorIcon color='error' /><span style={{color:"red"}}>Error</span></>)}
		</div>
	)
}

export default BidForm;