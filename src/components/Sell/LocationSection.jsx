import React, { useState, useEffect, useRef } from 'react'
import getLocationData from './../../services/getLocationData';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const LocationSection = ({ handleChange, error }) => {
	const [data, setData] = useState([]);
	const [value, setValue] = useState({});
	const fetchData = useRef(null);

	fetchData.current = async () => {
		const [data, error] = await getLocationData();
		if (!error) setData(data);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

	return (
		<div className='location-wrapper'>
			<Box >
				<FormControl fullWidth>
					<InputLabel style={error?{color:'#d32f2f'}:{}} id="demo-simple-select-label">Location</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={value.city}
						label="Age"
						error={error}
						onChange={(e)=>handleChange(e.target.value)}
					>
						{data.map(item => <MenuItem onClick={() => setValue(item)} key={item._id} value={item._id}>{item.city}</MenuItem>)}
					</Select>
					{error? <FormHelperText style={{color:'#d32f2f'}}>{error}</FormHelperText>: null}
				</FormControl>
			</Box>
		</div>
	)
}

export default LocationSection