import React, { useContext, useState } from 'react';
import { UserContext } from './../global/UserContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import uploadProfilePicture from './../services/uploadProfilePicture';

const UserImage = () => {
	const [image, setImage] = useState(null);
	const [displayImage, setDisplayImage] = useState(null);
	const [user, setUser] = useContext(UserContext);

	const handleChange = e => {
		if(e.currentTarget?.files[0]){
			setImage(e.currentTarget.files[0]);
			setDisplayImage(URL.createObjectURL(e.currentTarget.files[0]));
		}
	}
	
	const handleReset = () => {
		setDisplayImage(null)
		setImage(null);
	};
	
	const handleUpload = async() => {
		if(!image) return alert("No image was selected");
		const formData = new FormData();
		formData.append("image",image,"image");
		const [data, error] = await uploadProfilePicture(formData);
		if(error) console.log(error);
		setUser({...user, image: {url: data}});
	}

	return (
		<>
			<div className="profile-pic">
				{displayImage && <img src={displayImage} alt="display" />}
				{user.image ? <img src={user.image.url} alt={user.name} /> : !displayImage && <PersonOutlineIcon fontSize='large' />}
				<div className="input-wrapper">
					<CameraAltIcon className="icon" fontSize="medium" />
					<input type="file" onChange={handleChange} />
				</div>
			</div>
			{displayImage && <div style={{display:'flex', gap:10}}>
				<Button variant='contained' onClick={handleUpload}>Upload</Button>
				<Button variant='contained' color='error' onClick={handleReset}>Reset</Button>
				</div>}
		</>
	)
}

export default UserImage;