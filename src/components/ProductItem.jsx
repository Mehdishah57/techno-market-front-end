import React, { useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { UserContext } from './../global/UserContext';
import addToFav from './../services/addToFav';
import removeFromFav from './../services/removeFromFav';
import "../styles/productitem.scss";

const ProductItem = (props) => {
	const [user] = useContext(UserContext);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`./${props.product._id}`)
	}

	const addToFavourites = async() => {
		props.markFavourite(props.product._id,user._id)
		await addToFav(props.product._id);
	}

	const removeFromFavourites = async() => {
		props.removeFavourite(props.product._id,user._id)
		await removeFromFav(props.product._id);
	}

	const Favourite = () => {
		if(!props?.product?._id) return <div></div>;
		if(!user._id) return <div></div>
		const favourite = props.product.favourites?.find(element => element === user._id);
		if(!favourite) return (
			<div className="favourite" onClick={addToFavourites} >
				<FavoriteBorderIcon />
			</div>
		)
		return(
			<div className="favourite" onClick={removeFromFavourites} >
				<FavoriteIcon />
			</div>
		)
	}

	return (
		<div className="product-item" >
			<Favourite />
			<div onClick={handleClick} className="image">
				<img width="100%"
					src={props.product.picture?.image1?.url}
					alt={props.product.title}
				/>
			</div>
			<div className="info">
				<div className="title">{props.product.title}</div>
				<div className="price">RS: {props.product.price}</div>
				<div className="city">{props.product.city}</div>
			</div>
		</div>
	)
}

export default ProductItem;