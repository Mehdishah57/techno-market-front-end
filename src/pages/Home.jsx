import React, { useEffect, useRef, useState } from 'react';
import getProducts from '../services/getProducts';
import { Routes, Route } from "react-router-dom";
import ProductDetail from './../components/ProductDetail';
import MainHome from '../components/Home/MainHome';
import SearchHome from '../components/Home/SearchHome';

import "../styles/home.scss";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});

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

	return (
		<Routes>
			<Route path="/" element={<MainHome 
				products={products} 
				filters={filters}
				setFilters={setFilters}
				loading={loading}
				nextPage={nextPage}
				previousPage={previousPage}
				pageNumber={pageNumber}
				search={search}
				setSearch={setSearch}
			/>} />
			<Route path="/search" element={<SearchHome />} />
			<Route path="/:id" element={<ProductDetail />} />
		</Routes>
	)
}

export default Home;