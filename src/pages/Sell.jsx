import React, { useEffect, useRef, useState } from 'react';
import ImageSection from './../components/Sell/ImageSection';
import CategorySection from './../components/Sell/CategorySection';
import { Toaster, toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import LocationSection from './../components/Sell/LocationSection';
import addProduct from './../services/addProduct';
import { useNavigate, useParams } from "react-router-dom";
import TextInput from '../components/Sell/TextInput';
import TextArea from '../components/Sell/TextArea';
import SimpleBackdrop from '../components/BackDrop';
import Box from '@mui/material/Box';
import { Form, Formik } from 'formik';
import { productSchema } from "../schemas/product"

import "../styles/Sell/sell.scss";
import getMyAd from '../services/getMyAd';
import { updateProductSchema } from '../schemas/updateProduct';
import updateProduct from '../services/updateProduct';

const Sell = () => {
	const [state, setState] = useState({});
	const [color, setColor] = useState("inherit");
	const [updateError, setUpdateError] = useState(false);
	const [formError, setFormError] = useState("");
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	const fetchMyAd = useRef(null);
	fetchMyAd.current = async () => {
		const [data, error] = await getMyAd(id);
		if (error) return setUpdateError(true);
		setState(data);
	}

	const navigation = useNavigate();

	const handleSubmit = async (values) => {
		try {
			setLoading(true);
			let body = { ...values, ...state };
			if (!body?.picture?.image1) return toast.error("Please select atleast one image");
			const [data, error] = await addProduct(body);
			if (data) return navigation("/profile/my-ads");
			toast.error(error.response?.data || "An Error occured while posting ad 😒😒😒😒");
			setColor("error");
			setLoading(false)
		} catch (error) {
			toast.error(`${error.errors[0]}`);
			setColor("error");
			setLoading(false);
		}
	}

	const handleUpdate = async values => {
		
			let body = {
				title: values?.title || state.title,
				price: values?.price || state.price,
				description: values?.description || state.description,
				picture: {...state.picture},
				_id: state._id
			}
			if(!body.title || body.price || body.description){
				if(!body.title) return setFormError("Title can't be empty");
				if(!body.price) return setFormError("Price can't be empty");
				if(!body.description) return setFormError("Description can't be empty");
			}
			// if(body.title.length < 8) return setFormError("Title can't be less than 8 Characters");
			// if(body.description.length < 15) return setFormError("Description can't be less than 15 characters");
			// if(Number.isNan(parseInt(body.price))) return setFormError("Price must be a number");
			// if(parseInt(body.price) <= 10) return setFormError("Price must be more than Rs 10");
			if (!body?.picture?.image1) return setFormError("Please select atleast one image");
			setLoading(true);
			const [, error] = await updateProduct(body);
			if(error) return setFormError("We couldn't update your item");
			if(error) setLoading(false);
			navigation("/profile/my-ads")
	}

	useEffect(() => {
		if (!id) return;
		fetchMyAd.current();
	}, [id])

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContext="center"
			alignItems='center'
			width="100%"
			padding="10px"
		>
			<Toaster />
			<SimpleBackdrop loading={loading} />
			<Box
				marginBottom='10px'
			>
				<h2>{id ? "Update Your Ad" : "Post an Ad"}</h2>
			</Box>
			<Box
				width='100%'
				border='2px solid black'
				padding='40px'
			>
				<Box
					width='100%'
					marginBottom='10px'
				>
					<h2>Add Images for your item</h2>
				</Box>
				<ImageSection update={id?true:false} state={state} setState={setState} />
			</Box>
			<Formik
				initialValues={{
					title: "",
					price: "",
					description: "",
					location: "",
					category: "",
					subCategory: "",
					lat: "",
					lng: ""
				}}
				validationSchema={id? undefined :productSchema}
				onSubmit={!id ? handleSubmit: handleUpdate}

			>
				{({ handleChange, handleSubmit, errors }) => <Form
					id="form"
					onSubmit={handleSubmit}
				>
					<Box
						width="100%"
						borderBottom="2px solid black"
						padding="40px"
					>
						<Box
							width="100%"
						>
							<h2>Product Title</h2>
						</Box>
						<TextInput
							update={id?true:false}
							value={state.title}
							label="title"
							error={errors.title}
							handleChange={handleChange("title")}
						/>
					</Box>
					<Box
						width="100%"
						borderBottom="2px solid black"
						padding="40px"
					>
						<Box
							width="100%"
						>
							<h2>Price</h2>
						</Box>
						<TextInput
							update={id?true:false}
							value={state.price}
							label="price"
							error={errors.price}
							handleChange={handleChange("price")}
						/>
					</Box>
					<Box
						width="100%"
						borderBottom="2px solid black"
						padding="40px"
					>
						<Box
							width="100%"
						>
							<h2>Choose a category for your item</h2>
							{id ? <Box fontSize='12px'>You can't update category of your product</Box> : null}
						</Box>
						<CategorySection
							disabled={id ? true : false}
							errorCategory={errors.category}
							errorSubCategory={errors.subCategory}
							handleCategoryChange={handleChange("category")}
							handleSubCategoryChange={handleChange("subCategory")}
						/>
					</Box>
					<Box
						width="100%"
						borderBottom="2px solid black"
						padding="40px"
					>
						<Box
							width="100%"
						>
							<h2>Choose a location</h2>
							{id ? <Box fontSize='12px'>You can't update location of your product</Box> : null}
						</Box>
						<LocationSection
							disabled={id ? true : false}
							error={errors.location}
							handleChange={handleChange("location")}
						/>
					</Box>
					<Box
						width="100%"
						borderBottom="2px solid black"
						padding="40px"
					>
						<Box
							width="100%"
						>
							<h2>Add a Description</h2>
						</Box>
						<TextArea
							update={id?true:false}
							value={state.description}
							placeholder="Description..."
							onChange={handleChange("description")}
							error={errors.description}
						/>
					</Box>
					<Box
						width="100%"
						borderBottom="2px solid black"
						padding="40px"
					>
						{id? 
						<Box>
							<Button
						disabled={loading}
						variant="contained"
						className="post-button"
						type="submit"
						color={color}
					>
						Upadate Ad
					</Button>
					<Box color='red'>
						{formError}
					</Box>
						</Box>
						:<Button
							disabled={loading}
							variant="contained"
							className="post-button"
							type="submit"
							color={color}
						>
							Publish Now
						</Button>}
					</Box>
				</Form>}
			</Formik>
		</Box>
	)
}

export default Sell;