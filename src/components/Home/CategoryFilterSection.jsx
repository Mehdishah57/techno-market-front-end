import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse'
import getCategories from '../../services/getCategories';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "../../styles/category-filter.scss";

const CategoryFilterSection = ({ filters, setFilters }) => {
	const [categories, setCategories] = useState([]);
	const [dropList, setDropList] = useState(false);
	const fetchData = useRef(null);

	fetchData.current = async () => {
		const [data, error] = await getCategories();
		if (!error) setCategories(data);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

	const addMainCategory = mainCategory => {
		if(filters?.mainCategory === mainCategory) return;
		setFilters({...filters, mainCategory, subCategory: undefined});
	}

	const addSubCategory = (mainCategory, subCategory) => {
		if(filters?.subCategory === subCategory) return;
		setFilters({...filters, mainCategory, subCategory});
	}

	return (
		<Box display="flex" flexDirection="column" width='100%' padding={2}>
			<Box display="flex" flexWrap="wrap">
				<div className="category" onClick={() => setDropList(!dropList)}>
					Categories <ExpandMoreIcon />
				</div>
				<div className="category" onClick={() => setFilters({...filters, mainCategory:undefined, subCategory:undefined})}>
					All Categories
				</div>
				{categories.map(category => <div onClick={() => addMainCategory(category.name)} className="category">{category.name}</div>)}
			</Box>
			<Collapse in={dropList}>
				<Box display='flex' justifyContent="center" flexWrap="wrap">
					{categories.map(category => <Box display='flex' flexDirection="column" margin={1}>
						<h4 onClick={() => addMainCategory(category.name)} className='cat-heading'>{category.name}</h4>
						{category.subCategories.map(item => <Box onClick={() => addSubCategory(category.name,item)} 
							margin={0.5} className='sub-cat'>
							{item}</Box>)}
					</Box>)}
				</Box>
			</Collapse>
		</Box>
	)
}

export default CategoryFilterSection;