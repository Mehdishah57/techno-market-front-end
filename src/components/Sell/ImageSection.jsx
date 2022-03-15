import React, { useState, useEffect, useRef } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const ImageSection = ({ state, setState }) => {
  const [image, setImage] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
  });

	const handleChange = e => {
		if(!e.currentTarget?.files[0]) return;
		setImage({...image, [e.currentTarget.name]:URL.createObjectURL(e.currentTarget.files[0])})
		setState({...state, [e.currentTarget.name]:e.currentTarget.files[0]});
	}

  return (
    <div className="image-wrapper">
      <div>
        {image.image1 || state?.image1 ? (
          <img src={image.image1 || state?.image1} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input type="file" name="image1" onChange={handleChange}/>
      </div>
      {image.image1 && <div>
        {image.image2 || state?.image2 ? (
          <img src={image.image2 || state?.image2} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input type="file" name="image2" onChange={handleChange}/>
      </div>}
      {image.image2 && <div>
        {image.image3 || state?.image3 ? (
          <img src={image.image3 || state?.image3} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}

        <input type="file" name="image3" onChange={handleChange}/>
      </div>}
      {image.image3 && <div>
        {image.image4 || state?.image4 ? (
          <img src={image.image4 || state?.image4} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}

        <input type="file" name="image4" onChange={handleChange}/>
      </div>}
      {image.image4 && <div>
        {image.image5 || state?.image5 ? (
          <img src={image.image5 || state?.image5} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input type="file" name="image5" onChange={handleChange}/>
      </div>}
      {image.image5 && <div>
        {image.image6 || state?.image6 ? (
          <img src={image.image6 || state?.image6} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input type="file" name="image6" onChange={handleChange}/>
      </div>}
    </div>
  );
};

export default ImageSection;
