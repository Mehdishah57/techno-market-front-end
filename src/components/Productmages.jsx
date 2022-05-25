import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ProductImages = ({ product }) => {
	return <Carousel showThumbs={false} swipeable>
			{Object.values(product.picture).map(itm => <div>
				<img  src={itm.url} alt="" />
			</div>)}
		</Carousel>
}

export default ProductImages;
