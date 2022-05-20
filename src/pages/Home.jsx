import React, { useContext, useEffect, useRef, useState } from 'react';
import SearchSection from './../components/SearchSection';
import HomePageControl from '../components/HomePageControl';
import getProducts from '../services/getProducts';
import ProductItem from './../components/ProductItem';
import { Routes, Route } from "react-router-dom";
import ProductDetail from './../components/ProductDetail';
import { Toaster, toast } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import TuneIcon from '@mui/icons-material/Tune';
import Filters from '../components/Home/Filters';
import Box from '@mui/material/Box';

import "../styles/home.scss";
import FilterDrawer from '../components/Drawer';
import CategoryFilterSection from '../components/Home/CategoryFilterSection';
import CityFilterSection from '../components/Home/CityFilterSection';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});
	const [showFilter, setShowFilter] = useState(false);

	const fetchProducts = useRef();

	fetchProducts.current = async (payload) => {
		try {
			setLoading(true);
			const { data, error } = await getProducts(payload);
			if (error) console.log(error);
			setProducts(data || []);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchProducts.current({ pageNumber, search, filters });
	}, [pageNumber, search, filters]);

	const nextPage = () => products.length > 4 && setPageNumber(prevNumber => prevNumber + 1)

	const previousPage = () => pageNumber > 1 && setPageNumber(prevNumber => prevNumber - 1)

	const applyFilters = filter => {
		setFilters(filter);
		setShowFilter(false);
	}

	const MainHome = () => {
		return <div className="home-wrapper">
			<Toaster />
			<CityFilterSection filters={filters} setFilters={setFilters} />
			<CategoryFilterSection filters={filters} setFilters={setFilters} />
			<SearchSection search={search} setSearch={setSearch} />
			<Box display="flex" width="100%" padding={2}>
				{filters['cityObject']?.city}
			</Box>
			<div className="home-products-wrapper">
				{!loading? products.map(product =>
					<ProductItem
						key={product._id}
						product={product}
					/>): <CircularProgress thickness={4} />}
				{!products.length && !loading && <div className='no-result'>No Results</div>}
			</div>
			<HomePageControl
				pageNumber={pageNumber}
				nextPage={nextPage}
				previousPage={previousPage}
			/>
			{/* <Fab onClick={() => setShowFilter(true)} sx={{position:"absolute", bottom:"20px", right:"20px"}} color="inherit" aria-label="add">
        		<TuneIcon />
      		</Fab>
			<Filters 
				showFilter={showFilter} 
				setShowFilter={setShowFilter}
				applyFilters={applyFilters}
			/> */}
		</div>
	}

	return (
		<Routes>
			<Route path="/" element={<MainHome />} />
			<Route path="/:id" element={<ProductDetail />} />
		</Routes>
	)
}

export default Home;