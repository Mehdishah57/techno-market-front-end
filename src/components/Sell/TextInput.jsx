import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ value, label, state, setState }) => {
	return (
		<div className='text-wrapper'>
			<TextField
				size="medium"
				className="f0011"
				id="outlined-basic"
				sx={{ width: "100%" }}
				margin="dense"
				label={label}
				variant="outlined"
				autoComplete="off"
				onBlur={(e) => setState({...state, [label]:e.currentTarget.value})}
			/>
		</div>
	)
}

export default TextInput