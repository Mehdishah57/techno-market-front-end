import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectSection = ({state, setState}) => {
	const handleChange = e => setState({...state, mainCategory: e.currentTarget.value})

	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Age</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={null}
					label="Age"
					onChange={handleChange}
				>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}

export default SelectSection