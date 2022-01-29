import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchSection = (props) => {
	const [search, setSearch] = useState("");

	const handleSearch = async () => search !== props.search && props.setSearch(search)

	return (
		<div className="search-wrapper">
			<TextField
				size="medium"
				className="f0011"
				id="outlined-basic"
				label="Search"
				variant="outlined"
				type="text"
				autoComplete='off'
				fullWidth
				onChange={e => { setSearch(e.currentTarget.value) }}
			/>
			<Button
				className="b0011"
				variant="outlined"
				type="submit"
				onClick={handleSearch}
			>
				<SearchIcon />
			</Button>
		</div>
	)
}

export default SearchSection
