import React, { useRef, useState, useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import TextInput from '../Sell/TextInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

const Filters = ({ showFilter, setShowFilter, applyFilters }) => {
	const [filters, setFilters] = useState();
	const filterRef = useRef(null);

	const showFilters = () => {
		filterRef.current.style.top = "0px";
		filterRef.current.style.height = "100vh";
	}

	const closeFilters = () => {
		filterRef.current.style.height = "0.000001px";
		setShowFilter(false);
	}

	useEffect(() => {
		if (showFilter) showFilters();
	}, [showFilter])

	const handleChange = e => {
		setFilters({ ...filters, [e.target.value] :"price" })
	}

	return (
		<div ref={filterRef} className='filter-wrapper'>
			<div className='price-filters'>
				<TextInput state={filters} setState={setFilters} label="Minimum Price" />
				<TextInput state={filters} setState={setFilters} label="Maximum Price" />
				<Box marginTop={2}>
					<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Sort By Price</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							name="Sort By Price"
							label="Sort By Price"
							onChange={handleChange}
						>
							<MenuItem value={"High to Low"} >High to Low</MenuItem>
							<MenuItem value={"Low to High"} >Low to High</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div>
			<div className='filter-buttons'>
				<Button variant="contained" color="inherit">Reset</Button>
				<Button onClick={() => applyFilters(filters)} variant="contained" color="primary">Apply</Button>
			</div>
			<Fab
				onClick={closeFilters}
				sx={{ position: "absolute", top: "20px", right: "20px" }}
				color="primary"
				aria-label="add">
				<KeyboardArrowDownIcon />
			</Fab>
		</div>)
}

export default Filters