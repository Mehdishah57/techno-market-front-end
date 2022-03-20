import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BidForm from './BidForm';
import ProductBids from './ProductBids';
import ProductImages from './Productmages';
import fetchProductyById from '../services/fetchProductById';
import Loader from './Loader';
import Map from './Map';

import "../styles/productdetails.scss";

const ProductDetail = () => {
	const [product, setProduct] = useState({});
	const fetchProduct = useRef();

	const {id} = useParams();

	fetchProduct.current = async() => {
		const [data, error] = await fetchProductyById(id);
		if(!error) setProduct(data)
	}

	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

	useEffect(()=>{
		fetchProduct.current();
	},[])

	if(!product?._id) return <div className="product-wrapper">
		<Loader width={70} height={70} />
	</div>
	return (
		<div className="product-wrapper">
			<div className="back" onClick={handleBack}><ArrowBackIcon />Back</div>
			<ProductImages product={product} />
			<div className="title">{product.title}</div>
			<div className="price">RS: {product.price}</div>
			<div className="description">{product.description}</div>
			<BidForm product={product} />
			<div className="seller-name">Seller: {product.owner.name}</div>
			<ProductBids productId={product._id} />
			<Map longitude={product.location.lng} latitude={product.location.lat} />
		</div>
	)
}

export default ProductDetail;