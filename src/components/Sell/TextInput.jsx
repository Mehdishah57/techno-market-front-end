import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ value, label, handleChange, error }) => {
	return (
		<TextField
			size="medium"
			className="f0011"
			id="outlined-basic"
			margin="dense"
			fullWidth
			label={label}
			error={error}
			helperText={error}
			variant="outlined"
			autoComplete="off"
			onChange={handleChange}
		/>
	)
}

export default TextInput