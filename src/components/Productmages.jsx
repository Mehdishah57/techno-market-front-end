import React, { useState, useRef, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductImages = ({ product }) => {
	const [image, setImage] = useState("");
	const [stack, setStack] = useState(["image1"]);
	const [open, setOpen] = useState(false);

	const imageRef = useRef(null);
	const setInitialImage = useRef("");

	const nextImage = () => {
		if (stack.length === 6) return;
		let temp = [...stack];
		let str = `image${stack.length + 1}`;
		if (!product?.picture[str]?.url) return;
		temp.push(str);
		setStack(temp);
	}

	const prevImage = () => {
		if (stack.length === 1) return;
		let temp = [...stack];
		temp.pop();
		setStack(temp)
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
			<img
				onClick={() => setOpen(true)}
				src={product?.picture[stack[stack.length - 1]]?.url} width="100%"
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
