import React, { useContext, useState } from 'react';
import { UserContext } from './../global/UserContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import uploadProfilePicture from './../services/uploadProfilePicture';
import { Toaster, toast } from "react-hot-toast";
//https://teachablemachine.withgoogle.com/models/gusszBL0s/
//https://teachablemachine.withgoogle.com/models/wh-52BT_1/
//https://teachablemachine.withgoogle.com/models/MbZhmYO9X/

const UserImage = () => {
	const [displayImage, setDisplayImage] = useState(null);
	const [user, setUser] = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [processing] = useState(false);

	const handleChange = async e => {
		if (e.currentTarget?.files[0]) {
			// setProcessing(true);
			const reader = new FileReader();
			reader.readAsDataURL(e.currentTarget.files[0])
			reader.onloadend = () => setDisplayImage(reader.result);
			// const toastId = toast.loading('Your image is being processed!')
			// const url = "https://teachablemachine.withgoogle.com/models/MbZhmYO9X/";
			// let model, maxPredictions;
			// const modelURL = url + "model.json";
			// const metadataURL = url + "metadata.json";
			// model = await window.tmImage?.load(modelURL, metadataURL);
			// maxPredictions = model.getTotalClasses();
			// const prediction = await model.predict(document.getElementById('dispimg'));
			// const info = {}
			// for (let i = 0; i < maxPredictions; i++) {
			// 	// info[prediction[i].className] = prediction[i].probability.toFixed(2);
			// 	info[prediction[i].className] = prediction[i].probability;
			// }
			// let fp = {name: "", prob: 0};
			// Object.keys(info).map(key => {
			// 	if(info[key] > fp.prob){
			// 		fp.name = key;
			// 		fp.prob = info[key]
			// 	}
			// 	return 0;
			// })
			// setProcessing(false);
			// toast.dismiss(toastId);
			// toast.success(`Apparently you uploaded a ${fp.name} Picture ????????????`, {duration: 5000})
		}
	}

	const handleReset = () => setDisplayImage(null)
	
	const showError = (error) => {
		console.log(error);
		toast.error(error?.response?.data || error?.message || `There was an
		issue uploading your image`);
		setLoading(false);
	}

	const handleUpload = async () => {
		if(!displayImage) return toast.error("You didn't select any image! ????????????");
		setLoading(true);
		const formData = new FormData();
		formData.append("image", displayImage);
		const [data, error] = await uploadProfilePicture(formData);
		if(error) return showError(error);
		setDisplayImage(null);
		setUser({ ...user, image: { url: data.url }})
		setLoading(false);
	}

	return (
		<>
			<Toaster />
			<div className="profile-pic">
				{displayImage && <img id="dispimg" src={displayImage} alt="display" />}
				{user.image && !displayImage ? <img id='uniqueimg' src={user.image.url} alt={user.name} /> : !displayImage && <PersonOutlineIcon fontSize='large' />}
				<div className="input-wrapper">
					<CameraAltIcon className="icon" fontSize="medium" />
					<input type="file" onChange={handleChange} />
				</div>
			</div>
			{displayImage && <div style={{ display: 'flex', gap: 10 }}>
				<Button
					variant='contained'
					color='inherit'
					disabled={loading || processing}
					onClick={handleUpload}>
					Upload
				</Button>
				<Button
					variant='contained'
					color='error'
					disabled={loading || processing}
					onClick={handleReset}>
					Reset
				</Button>
			</div>}
		</>
	)
}

export default UserImage;