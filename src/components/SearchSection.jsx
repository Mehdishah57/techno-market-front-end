import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchSection = (props) => {
	const [search, setSearch] = useState("");

	const handleSearch = async () => search !== props.search && props.setSearch(search)

	useEffect(()=>{
		if(props.search)
			setSearch(props.search);
	},[])

	return (
		<div className="search-wrapper">
			<TextField
				size="small"
				className="f0011"
				id="outlined-basic"
				label="Search"
				variant="outlined"
				type="text"
				autoComplete='off'
				fullWidth
				value={search}
				onChange={e => { setSearch(e.currentTarget.value) }}
			/>
			<Button
				className="b0011"
				variant="contained"
				color="primary"
				type="submit"
				onClick={handleSearch}
			>
				<SearchIcon />
			</Button>
		</div>
	)
}

export default SearchSection
