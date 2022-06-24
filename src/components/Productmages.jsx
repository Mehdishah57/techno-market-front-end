import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ProductImages = ({ product }) => {
	return <Carousel showThumbs={false} swipeable>
			{Object.values(product.picture).map(itm => <div style={{maxWidth: '590px', maxHeight: '400px'}}>
				<img src={itm.url} alt="" width="100%" style={{maxHeight:'400px'}} />
			</div>)}
		</Carousel>
}

export default ProductImages;
