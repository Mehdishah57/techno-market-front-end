import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { UserContext } from './../global/UserContext';
import ImageSection from './../components/Sell/ImageSection';
import CategorySection from './../components/Sell/CategorySection';
import { Toaster, toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import validateProduct from './../schemas/product';
import LocationSection from './../components/Sell/LocationSection';
import addProduct from './../services/addProduct';
import getMyAd from '../services/getMyAd';
import { useNavigate, useParams } from "react-router-dom";
import TextInput from '../components/Sell/TextInput';
import TextArea from '../components/Sell/TextArea';
import SimpleBackdrop from '../components/BackDrop';


import "../styles/Sell/sell.scss";

const Sell = () => {
	const [state, setState] = useState({});
	const [color, setColor] = useState("inherit");
	const [loading, setLoading] = useState(false);
	const [user] = useContext(UserContext);
	const fetchAd = useRef(null);
	const { id } = useParams();
	const navigation = useNavigate();

	const handleClick = async () => {
		try {
			setLoading(true);
			await validateProduct(state);
			const [data, error] = await addProduct(state);
			if (data) return navigation("/profile/my-ads");
			toast.error(error.response?.data || "An Error occured while posting ad 😒😒😒😒");
			setColor("error");

		} catch (error) {
			if (!state?.picture) toast.error("Atleast one image is required! 😒😒")
			else toast.error("An Error occured while posting ad 😒😒😒😒");
			setColor("error");
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
		<div className="sell-wrapper" style={{pointerEvents:loading?'none':'all'}}>
			{ loading && <SimpleBackdrop open={loading} />}
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