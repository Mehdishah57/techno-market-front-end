import React, { useEffect, useRef, useState } from 'react';
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

import "../styles/home.scss";
import FilterDrawer from '../components/Drawer';

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
			if (error) return console.log(error);
			if (!data.length) return toast.error("We couldn't find products related to your query")
			setProducts(data);
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
		return loading ? <div style={{ height: "80vh" }} className='home-wrapper'>
			<CircularProgress thickness={4} />
		</div> : <div className="home-wrapper">
			<Toaster />
			<FilterDrawer />
			<SearchSection search={search} setSearch={setSearch} />
			<div className="home-products-wrapper">
				{products.map(product =>
					<ProductItem
						key={product._id}
						product={product}
					/>)}
			</div>
			<HomePageControl
				pageNumber={pageNumber}
				nextPage={nextPage}
				previousPage={previousPage}
			/>
			<Fab onClick={() => setShowFilter(true)} sx={{position:"absolute", bottom:"20px", right:"20px"}} color="inherit" aria-label="add">
        		<TuneIcon />
      		</Fab>
			<Filters 
				showFilter={showFilter} 
				setShowFilter={setShowFilter}
				applyFilters={applyFilters}
			/>
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