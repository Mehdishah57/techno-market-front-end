import React, { useState, useEffect, useRef, useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getLocationData from '../../services/getLocationData';

const CityFilterSection = ({ filters, setFilters, loading, setLoading }) => {
	const [cities, setCities] = useState([]);
	const [localCity, setLocalCity] = useState("");
	const fetchData = useRef(null);

	fetchData.current = async () => {
		const [data, error] = await getLocationData();
		if (!error) setCities(data);
		setLocalCity(filters['cityObject']?.city);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

	const handleChange = (event) => {
		setLocalCity(event.target.value);
		setFilters({...filters, city: event.target.value})
	};

	return (
		<Box display='flex' width='100%' minWidth="160px" >
			<Box width='100%'>
				<FormControl fullWidth size="small">
					<InputLabel id="demo-simple-select-label">City</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={filters['city'] || localCity}
						label="City"
						onChange={handleChange}
					>
						<MenuItem value={undefined}>All Pakistan</MenuItem>
						{cities.sort((a,b)=>a.city.localeCompare(b.city)).map(itm => <MenuItem value={itm._id}>{itm.city}</MenuItem>)}
					</Select>
				</FormControl>
			</Box>
		</Box>
	)
}

export default CityFilterSection