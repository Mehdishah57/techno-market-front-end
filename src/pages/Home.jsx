import React, { useEffect, useRef, useState } from 'react';
import getProducts from '../services/getProducts';
import { Routes, Route } from "react-router-dom";
import ProductDetail from './../components/ProductDetail';
import MainHome from '../components/Home/MainHome';
import SearchHome from '../components/Home/SearchHome';
import CategoryFilterSection from "../components/Home/CategoryFilterSection";
import SearchSection from '../components/SearchSection';
import Box from '@mui/material/Box';

import "../styles/home.scss";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
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

	// useEffect(() => {
	// 	fetchProducts.current({ pageNumber, search, filters });
	// }, [pageNumber, search, filters]);


	return (
		<Routes>
			<Route path="/" element={<MainHome filters={filters} setFilters={setFilters}
				search={search} setSearch={setSearch}
			/>} />
			<Route path="/search" element={<SearchHome />} />
			<Route path="/:id" element={<ProductDetail />} />
		</Routes>
	)
}

export default Home;