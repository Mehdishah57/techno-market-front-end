import React from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const ImageSection = ({ state, setState }) => {
	const handleChange = e => {
		if(!e.currentTarget?.files[0]) return;
    if(e.currentTarget.files[0].type?.indexOf("image") === -1)
      return;
    var itemName = e.currentTarget.name;
    const reader = new FileReader();
    reader.readAsDataURL(e.currentTarget.files[0]);
    reader.onloadend = () => 
		setState({...state, picture: { ...state.picture, [itemName]:reader.result }});
  }

  return (
    <div className="image-wrapper">
      <div>
        {state.picture?.image1 ? (
          <img src={state?.picture?.image1 || state.picture?.image1.url} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input accept="image/*" type="file" name="image1" onChange={handleChange}/>
      </div>
      {(state.picture?.image1) && <div>
        {state.picture?.image2 ? (
          <img src={state?.picture?.image2 || state.picture?.image2.url} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input accept="image/*" type="file" name="image2" onChange={handleChange}/>
      </div>}
      {(state.picture?.image2) && <div>
        {state.picture?.image3 ? (
          <img src={state?.picture?.image3 || state.picture?.image3.url} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}

        <input accept="image/*" type="file" name="image3" onChange={handleChange}/>
      </div>}
      {(state.picture?.image3) && <div>
        {state.picture?.image4 ? (
          <img src={state?.picture?.image4 || state.picture?.image4.url} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}

        <input accept="image/*" type="file" name="image4" onChange={handleChange}/>
      </div>}
      {(state.picture?.image4) && <div>
        {state.picture?.image5 ? (
          <img src={state?.picture?.image5 || state.picture?.image5.url} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input accept="image/*" type="file" name="image5" onChange={handleChange}/>
      </div>}
      {(state.picture?.image5) && <div>
        {state.picture?.image6 ? (
          <img src={state?.picture?.image6 || state.picture?.image6.url} alt="" />
        ) : (
          <CameraAltOutlinedIcon fontSize="large"/>
        )}
        <input accept="image/*" type="file" name="image6" onChange={handleChange}/>
      </div>}
    </div>
  );
};

export default ImageSection;
