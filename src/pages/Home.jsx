import React, { useEffect, useRef, useState } from 'react';
import SearchSection from './../components/SearchSection';
import HomePageControl from '../components/HomePageControl';
import getProducts from '../services/getProducts';
import ProductItem from './../components/ProductItem';
import { Routes, Route } from "react-router-dom";
import ProductDetail from './../components/ProductDetail';

import "../styles/home.scss";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [pageNumber, setPageNumber] = useState(1);

	const fetchProducts = useRef();

	fetchProducts.current = async (payload) => {
		const { data, error } = await getProducts(payload);
		if (error) return console.log(error);
		setProducts(data);
	}

	useEffect(() => {
		if (!search) fetchProducts.current({ pageNumber });
		else fetchProducts.current({ pageNumber, search });
	}, [pageNumber, search]);

	const nextPage = () => products.length > 4 && setPageNumber(prevNumber => prevNumber + 1)

	const previousPage = () => pageNumber > 1 && setPageNumber(prevNumber => prevNumber - 1)

	const markFavourite = (productId, userId) => {
		const temp = [...products];
		const targetProduct = temp.find(product => product._id === productId )
		if(!targetProduct?.favourites) return targetProduct.favourites = [userId];
		targetProduct?.favourites?.push(userId);
		setProducts(temp);
	}

	const removeFavourite = (productId, userId) => {
		const temp = [...products];
		let targetProduct = temp.find(product => product._id === productId )
		if(!targetProduct?.favourites) return;
		targetProduct.favourites = targetProduct?.favourites?.filter(id => id !== userId);
		setProducts(temp);
	} 

	const MainHome = () => (
		<div className="home-wrapper">
			<SearchSection search={search} setSearch={setSearch} />
			<div className="home-products-wrapper">
				{products.map(product => 
				<ProductItem 
					key={product._id} 
					product={product}
					markFavourite={markFavourite}
					removeFavourite={removeFavourite} 
				/>)}
			</div>
			<HomePageControl
				pageNumber={pageNumber}
				nextPage={nextPage}
				previousPage={previousPage}
			/>
		</div>
	)

	return (
		<Routes>
			<Route path="/" element={<MainHome />} />
			<Route path="/:id" element={<ProductDetail />} />
		</Routes>
	)
}

export default Home;