import React, { useState, useRef, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductImages = ({product}) => {
	const [image, setImage] = useState("");
	const [open, setOpen] = useState(false);

	const imageRef = useRef(null);
	const setInitialImage = useRef("");

	const nextImage = () => {
		const images = Object.keys(product.picture);
		if (images.length === 1) return;
		let currentIndex = images.map((key,index)=>product.picture[key].url === image && index)
		if (images[currentIndex[0] + 1])
			setImage(product.picture[images[currentIndex[0] + 1]].url)
	}

	const prevImage = () => {
		const images = Object.keys(product.picture);
		if (images.length === 1) return;
		let currentIndex = images.map((key,index)=>product.picture[key].url === image && index)
		if (images[currentIndex[0] - 1])
			setImage(product.picture[images[currentIndex[0] - 1]].url)
	}

	const FullScreenImage = () => (
		<div className="fullScreen-image">
			<img onClick={() => setOpen(false)} src={image} alt={product.title} />
		</div>
	)

	setInitialImage.current = () => product?.picture?.image1?.url &&
		setImage(product.picture.image1.url)

	useEffect(() => {
		setInitialImage.current();
	}, [])
	return <div className="image-section">
		<div className="back" onClick={prevImage}>
			<ArrowBackIosIcon fontSize="large" />
		</div>
		<div ref={imageRef} className="image">
			<img
				onClick={() => setOpen(true)}
				src={image} width="100%"
				alt={product.title}
			/>
		</div>
		<div className="next" onClick={nextImage}>
			<ArrowForwardIosIcon fontSize="large" />
		</div>
		{open && <FullScreenImage />}
	</div>;
};

export default ProductImages;
