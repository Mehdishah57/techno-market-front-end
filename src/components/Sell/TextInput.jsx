import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ value, label, state, setState }) => {
	const [text, setText] = useState("");

	return (
		<div className='text-wrapper'>
			<TextField
				size="medium"
				className="f0011"
				id="outlined-basic"
				sx={{ width: "100%" }}
				margin="dense"
				value={value}
				label={label}
				variant="outlined"
				autoComplete="off"
				onBlur={() => setState({...state, [label]:text})}
				onChange={e => setText(e.currentTarget.value)}
			/>
		</div>
	)
}

export default TextInput