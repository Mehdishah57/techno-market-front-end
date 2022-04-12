import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { UserContext } from './../global/UserContext';
import ImageSection from './../components/Sell/ImageSection';
import CategorySection from './../components/Sell/CategorySection';
import { Toaster, toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import validateProduct from './../schemas/product';
import LocationSection from './../components/Sell/LocationSection';
import addProduct from './../services/addProduct';
import getMyAd from '../services/getMyAd';
import { useParams } from "react-router-dom";

import "../styles/Sell/sell.scss";
import TextInput from '../components/Sell/TextInput';
import TextArea from '../components/Sell/TextArea';

const Sell = () => {
	const [state, setState] = useState({});
	const [color, setColor] = useState("inherit");
	const [loading, setLoading] = useState(false);
	const [, setError] = useState("");
	const [user] = useContext(UserContext);
	const fetchAd = useRef(null);
	const { id } = useParams();

	const handleClick = async () => {
		try {
			setLoading(true);
			await validateProduct(state);
			const formData = new FormData();
			formData.append("title", state.title);
			formData.append("description", state.description);
			formData.append("location", state.location);
			formData.append("subCategory", state.subCategory)
			formData.append("category", state.category)
			formData.append("price", state.price);
			Object.keys(state.picture).map(key => formData.append(key, state.picture[key]))
			const [data, error] = await addProduct(formData);
			if (data) toast.success("You've successfully posted the ad! 👌👌👌👌", { duration: 5000 });
			else if (error)
				toast.error(error.response?.data || "An Error occured while posting ad 😒😒😒😒");
			setColor(error ? "error" : "success");
		} catch (error) {
			if (!state?.picture) return toast.error("Atleast one image is required! 😒😒")
			toast.error(error.message || "An Error occured while posting ad 😒😒😒😒");
			setColor("error");
		} finally {
			setLoading(false);
		}
	}

	fetchAd.current = async () => {
		const [data, error] = await getMyAd(id);
		if (error) return;
		setState({
			title: data.title,
			price: data.price,
			description: data.description,
			category: data.category,
			subCategory: data.subCategory,
			picture: data.picture
		})
	}

	useLayoutEffect(() => {
		if (!id) return;
		fetchAd.current();
	}, [id])

	useEffect(() => {
		setState({ owner: user._id })
	}, [user._id])

	return (
		<div className="sell-wrapper">
			<Toaster />
			<ImageSection state={state} setState={setState} />
			<TextInput value={state.title} label="title" state={state} setState={setState} />
			<TextInput value={state.price} label="price" state={state} setState={setState} />
			<CategorySection state={state} setState={setState} />
			<LocationSection state={state} setState={setState} />
			<TextArea 
				value={state.description} 
				placeholder="Description..." 
				state={state} 
				setState={setState}
				/>
			<Button disabled={loading} variant="contained" onClick={handleClick} color={color}>Publish</Button>
		</div>
	)
}

export default Sell;