import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../global/UserContext';
import Box from "@mui/material/Box";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import MessageIcon from '@mui/icons-material/Message';
import BidForm from './BidForm';
import ProductBids from './ProductBids';
import ProductImages from './Productmages';
import fetchProductyById from '../services/fetchProductById';
import CircularProgress from '@mui/material/CircularProgress';
import Map from './Map';
import FormDialog from './FormDialog';

import "../styles/productdetails.scss";

const ProductDetail = () => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [user] = useContext(UserContext);
	const fetchProduct = useRef();

	const { id } = useParams();

	fetchProduct.current = async () => {
		setLoading(true)
		const [data, error] = await fetchProductyById(id);
		if (!error) setProduct(data)
		setLoading(false);
	}

	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

	useEffect(() => {
		fetchProduct.current();
	}, [])

	if (loading) return <div style={{ height: "80vh" }} className="product-wrapper">
		<CircularProgress thickness={4} />
	</div>
	return (
		<div className="product-wrapper">
			<div className="back" onClick={handleBack}><ArrowBackIcon />Back</div>
			<Box 
				display='flex' 
				justifyContent='center' 
				overflow='hidden' 
				alignItems='center' 
				width='50%' 
				maxWidth='590px' 
				maxHeight='400px'
			>
				<ProductImages product={product} />
			</Box>
			<div className="title">{product.title}</div>
			<div className="price">RS: {product.price}</div>
			<div className="description">{product.description}</div>
			{user?._id && <BidForm
				product={product} />}
			<div className="seller-name">Seller: {product.owner.name}</div>
			{user?._id && product?.owner?._id !== user._id && <div className="actions">
				<div className="icon-wrapper">
					<CallIcon fontSize="large" />
				</div>
				<div onClick={() => setOpen(true)} className="icon-wrapper">
					<MessageIcon fontSize="large" />
				</div>
			</div>}
			<ProductBids productId={product._id} />
			<Map longitude={product.location.lng} latitude={product.location.lat} />
			<FormDialog
				open={open}
				setOpen={setOpen}
				title={`Message ${product?.owner?.name}`}
				description={`Product: ${product?.title} Price: ${product.price}`}
				id={product?.owner?._id}
			/>
		</div>
	)
}

export default ProductDetail;