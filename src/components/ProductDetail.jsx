import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductContext } from './../global/ProductContext';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import BidItem from './BidItem';

import "../styles/productdetails.scss";

const ProductDetail = () => {
	const [image, setImage] = useState("");
	const [open, setOpen] = useState(false);

	const imageRef = useRef(null);

	const { product } = useContext(ProductContext);

	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

	const setInitialImage = useRef("");

	setInitialImage.current = () => product?.picture?.image1?.url && 
									setImage(product.picture.image1.url)

	useEffect(()=>{
		setInitialImage.current();
	},[])

	const nextImage = () => {
		const images = Object.keys(product.picture);
		if(images.length === 1) return;
		const currentIndex = images.indexOf(image);
		if(images[currentIndex+1])
			setImage(product.picture[images[currentIndex+1]].url)
	}

	const prevImage = () => {}

	const FullScreenImage = () => (
		<div className="fullScreen-image">
			<img onClick={()=>setOpen(false)} src={image} alt={product.title} />
		</div>
	)

	return (
		<div className="product-wrapper">
			<div className="back" onClick={handleBack}><ArrowBackIcon />Back</div>
			<div className="image-section">
				<div className="back" onClick={prevImage}>
					<ArrowBackIosIcon fontSize="large" />
				</div>
				<div ref={imageRef} className="image">
					<img 
						onClick={()=>setOpen(true)} 
						src={image} width="100%" 
						alt={product.title} 
					/>
				</div>
				<div className="next" onClick={nextImage}>
					<ArrowForwardIosIcon fontSize="large" />
				</div>
			</div>
			<div className="title">{product.title}</div>
			<div className="price">RS: {product.price}</div>
			<div className="description">{product.description}</div>
			<div className="seller-name">Seller: {product.owner.name}</div>
			{open && <FullScreenImage />}
		</div>
	)
}

export default ProductDetail;