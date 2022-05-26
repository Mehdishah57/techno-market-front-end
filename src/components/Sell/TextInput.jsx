import React, { useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ value, label, handleChange, error, update }) => {
	const [text, setText] = useState("");

	useEffect(()=>{
		if(!value || !update) return;
		setText(value);
	},[value,update])

	return (
		<>
			{update? 
			<TextField
			size="medium"
			className="f0011"
			id="outlined-basic"
			margin="dense"
			fullWidth
			label={label}
			error={error}
			value={text}
			autoFocus
			helperText={error}
			variant="outlined"
			autoComplete="off"
			onChange={(e)=>{handleChange(e.target.value);setText(e.target.value)}}
		/>
			:
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
			onChange={(e)=>handleChange(e.target.value)}
		/>}
		</>
	)
}

export default TextInput