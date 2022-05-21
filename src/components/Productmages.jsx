import React, { useState, useRef } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import { Carousel } from 'react-responsive-carousel';
const ProductImages = ({ product }) => {
	const [stack, setStack] = useState(["image1"]);
	const [open, setOpen] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const imageRef = useRef(null);

	const nextImage = () => {
		if (stack.length === 6) return;
		let temp = [...stack];
		let str = `image${stack.length + 1}`;
		if (!product?.picture[str]?.url) return;
		temp.push(str);
		setStack(temp);
		setLoaded(false)
	}

	const prevImage = () => {
		if (stack.length === 1) return;
		let temp = [...stack];
		temp.pop();
		setStack(temp)
		setLoaded(false)
	}

	const FullScreenImage = () => (
		<div className="fullScreen-image">
			<img
				onClick={() => setOpen(false)}
				src={product?.picture[stack[stack.length - 1]]?.url}
				alt={product.title}
			/>
		</div>
	)

	return <div className="image-section">
		<div className="back" onClick={prevImage}>
			<ArrowBackIosIcon fontSize="large" />
		</div>
		<div ref={imageRef} className="image">
			{!loaded && <div className='loader'>
				<CircularProgress  />
			</div>}
			<img
				onClick={() => setOpen(true)}
				src={product?.picture[stack[stack.length - 1]]?.url} width="100%"
				alt={product.title}
				onLoad={() => setLoaded(true)}
			/>
		</div>
		<div className="next" onClick={nextImage}>
			<ArrowForwardIosIcon fontSize="large" />
		</div>
		{open && <FullScreenImage />}
	</div>;
};

// const ProductImages = ({ product }) => {
// 	return <div className="image-section">
// 		<Carousel width="300px">
// 			{Object.values(product.picture).map(itm => <div>
// 				<img src={itm.url} alt="" />
// 			</div>)}
// 		</Carousel>
// 	</div>
// }

export default ProductImages;
