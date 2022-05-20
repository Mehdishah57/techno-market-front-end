import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getLocationData from '../../services/getLocationData';

const CityFilterSection = ({ filters, setFilters }) => {
	const [cities, setCities] = useState([]);
	const [city, setCity] = useState("");
	const fetchData = useRef(null);

	fetchData.current = async () => {
		const [data, error] = await getLocationData();
		if (!error) setCities(data);
	
		setCity(filters['cityObject']?.city);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

	const handleChange = (event) => {
    setCity(event.target.value);
		setFilters({...filters, city: event.target.value})
  };

	return (
		<Box display='flex' width='100%' padding={2}>
			<Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filters['city']||city}
          label="City"
          onChange={handleChange}
        >
					<MenuItem value={undefined}>All Pakistan</MenuItem>
          {cities.map(itm => <MenuItem value={itm._id}>{itm.city}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
		</Box>
	)
}

export default CityFilterSection