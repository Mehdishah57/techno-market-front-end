import React, { useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { UserContext } from './../global/UserContext';
import addToFav from './../services/addToFav';
import removeFromFav from './../services/removeFromFav';
import ProductImage from './ProductImage';
import { Toaster, toast } from 'react-hot-toast';

import "../styles/productitem.scss";

const ProductItem = (props) => {
	const [user, setUser] = useContext(UserContext);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/home/${props.product._id}`)
	}

	const addToFavourites = async () => {
		const favourites = user.favourites.find(id => id === props.product._id);
		if (favourites) return toast.error("Item already in favourites! 😁❤️❤️");
		setUser({ ...user, favourites: [...user.favourites, props.product._id] })
		await addToFav(props.product._id);
	}

	const removeFromFavourites = async () => {
		const favourites = user.favourites.filter(id => id !== props.product._id);
		if (!favourites) return toast.error("Item already removed from favourites! 💘💘");
		setUser({ ...user, favourites });
		await removeFromFav(props.product._id);
	}

	const Favourite = () => {
		if (!user._id) return <></>
		if (props.product.owner === user._id) return <></>;
		const favourite = user.favourites?.find(id => id === props.product._id);
		if (!favourite) return (
			<div className="favourite" onClick={addToFavourites} >
				<FavoriteBorderIcon color='error' />
			</div>
		)
		return (
			<div className="favourite" onClick={removeFromFavourites} >
				<FavoriteIcon color='error' />
			</div>
		)
	}

	return (
		<div className="product-item" >
			<Toaster />
			<Favourite />
			<ProductImage handleClick={handleClick} product={props.product} />
			<div className="info">
				<div className="title">{props.product.title}</div>
				<div className="price">RS: {props.product.price}</div>
				<div className="city">{props.product.location?.city}</div>
			</div>
		</div>
	)
}

export default ProductItem;