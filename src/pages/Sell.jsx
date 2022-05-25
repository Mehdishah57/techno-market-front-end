import React, { useState } from 'react';
import ImageSection from './../components/Sell/ImageSection';
import CategorySection from './../components/Sell/CategorySection';
import { Toaster, toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import LocationSection from './../components/Sell/LocationSection';
import addProduct from './../services/addProduct';
import { useNavigate } from "react-router-dom";
import TextInput from '../components/Sell/TextInput';
import TextArea from '../components/Sell/TextArea';
import SimpleBackdrop from '../components/BackDrop';
import Box from '@mui/material/Box';
import { Form, Formik } from 'formik';
import { productSchema } from "../schemas/product"

import "../styles/Sell/sell.scss";

const Sell = () => {
	const [state, setState] = useState({});
	const [color, setColor] = useState("inherit");
	const [loading, setLoading] = useState(false);

	const navigation = useNavigate();

	const handleSubmit = async (values) => {
		console.log(values)
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
			<ImageSection state={state} setState={setState} />
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
				validationSchema={productSchema}
				onSubmit={handleSubmit}

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
						</Box>
						<CategorySection
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
						</Box>
						<LocationSection
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
						<Button
							disabled={loading}
							variant="contained"
							className="post-button"
							type="submit"
							color={color}
						>
							Publish Now
						</Button>
					</Box>
				</Form>}
			</Formik>
		</Box>
	)
}

export default Sell;