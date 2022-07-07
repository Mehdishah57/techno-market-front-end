import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Avatar from "@mui/material/Avatar"
import { PhotoProvider, PhotoView } from "react-photo-view"

const ProductImages = ({ product }) => {
	return <PhotoProvider>
		<Carousel showThumbs={false} swipeable>
			{Object.values(product.picture).map(itm => <div style={{maxWidth: '590px', maxHeight: '400px'}}>
				{/* <img src={itm.url} alt="" width="100%" style={{maxHeight:'400px'}} /> */}
				<PhotoView src={itm.url}>
				<Avatar 
					src={itm.url} 
					alt="profile"
					sx={{height: '400px', borderRadius: 0, width: '100%'}} 
				/>
				</PhotoView>
			</div>)}
		</Carousel>
	</PhotoProvider>
}

export default ProductImages;
