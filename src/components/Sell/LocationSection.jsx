import React, { useState, useEffect, useRef } from 'react'
import getLocationData from './../../services/getLocationData';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LocationSection = ({ state, setState }) => {
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

	const handleChange = e => setState({ ...state, location: e.target.value })

	return (
		<div className='location-wrapper'>
			<Box >
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Location</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={value.city}
						label="Age"
						onChange={handleChange}
					>
						{data.map(item => <MenuItem onClick={() => setValue(item)} key={item._id} value={item._id}>{item.city}</MenuItem>)}
					</Select>
				</FormControl>
			</Box>
		</div>
	)
}

export default LocationSection