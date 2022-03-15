import React, { useContext, useState } from 'react';
import { UserContext } from './../global/UserContext';
import ImageSection from './../components/Sell/ImageSection';
import CategorySection from './../components/Sell/CategorySection';
import { Toaster, toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';

import "../styles/Sell/sell.scss";

const Sell = () => {
	const [state, setState] = useState({});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [user] = useContext(UserContext);
	return (
		<div className="sell-wrapper">
			<Toaster />
			<ImageSection state={state} setState={setState} />
			<div className='text-wrapper'>
				<TextField
					size="medium"
					className="f0011"
					id="outlined-basic"
					sx={{width:"100%"}}
					margin="dense"
					label="Title"
					disabled={loading}
					variant="outlined"
					autoComplete="off"
					onChange={e => { setState({ ...state, title: e.currentTarget.value }); setError("") }}
				/>
			</div>
			<div className='text-wrapper'>
				<TextField
					size="medium"
					className="f0011"
					id="outlined-basic"
					sx={{width:"100%"}}
					margin="dense"
					label="price"
					disabled={loading}
					variant="outlined"
					autoComplete="off"
					onChange={e => { setState({ ...state, price: e.currentTarget.value }); setError("") }}
				/>
			</div>
			<CategorySection state={state} setState={setState} />
		</div>
	)
}

export default Sell;