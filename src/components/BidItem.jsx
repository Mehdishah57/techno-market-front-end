import React, { useState, useContext } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import formatDate from './../utils/formateDate';
import { UserContext } from './../global/UserContext';
import AlertDialog from './AlertDialog';
import bidDelete from './../services/bidDelete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import "../styles/biditem.scss";

const BidItem = ({ bid, deletebid }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user] = useContext(UserContext);

	const deleteBid = async () => {
		setOpen(false);
		setLoading(true);
		const [, error] = await bidDelete({ userId: (bid.by?._id || null), productId: bid.productId });
		if (!error) deletebid(bid._id);
		if (bid) setLoading(false);
	}

	return (
		<div className="bid-item">
			<div className="icon">
				<PersonOutlineIcon fontSize="large" />
			</div>
			{bid.by && <div className="bid-by">{bid.by.name.slice(0, 15)}</div>}
			<div className="bid-price">RS: {bid.price}</div>
			<div className="time">{formatDate(bid.at)}</div>
			{((user && user._id === bid.productOwner) || (bid.userId === user._id)) &&
				(<div className="delete-bid">
					<DeleteIcon onClick={() => setOpen(true)} color='error' />
					<AlertDialog
						open={open}
						setOpen={setOpen}
						title={"Are you sure you want to continue?"}
						message={"You are deleting a bid on your ad and it is an irreversible action"}
						task={deleteBid}
						taskArguments={[]}
					/>
				</div>)
			}
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	)
}



export default BidItem;
