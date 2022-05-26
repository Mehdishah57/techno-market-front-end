import React from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CancelIcon from '@mui/icons-material/Cancel';
const ImageSection = ({ state, setState, update }) => {
  const handleChange = e => {
    if (!e.currentTarget?.files[0]) return;
    if (e.currentTarget.files[0].type?.indexOf("image") === -1)
      return;
    var itemName = e.currentTarget.name;
    const reader = new FileReader();
    reader.readAsDataURL(e.currentTarget.files[0]);
    reader.onloadend = () =>
      setState({ ...state, picture: { ...state.picture, [itemName]: reader.result } });
  }

  const handleRemoveImage = (e,name) => {
    setState({...state, picture: { ...state.picture, [name]:undefined }})
  }

  return (
    <div className="image-wrapper">
      <div>
        <img src={state.picture?.image1?.url || state.picture?.image1} alt="" />
        <CameraAltOutlinedIcon fontSize="large" />
        <input accept="image/*" type="file" name="image1" onChange={handleChange}/>
      </div>
      <div>
        <img src={state.picture?.image2?.url || state.picture?.image2} alt="" />
        <CameraAltOutlinedIcon fontSize="large" />
        <input accept="image/*" type="file" name="image2" onChange={handleChange}/>
       {state.picture?.image2?.url && <div onClick={(e)=>handleRemoveImage(e,"image2")} className="update">
          <CancelIcon />
      </div>}
      </div>
      <div>
        <img src={state.picture?.image3?.url || state.picture?.image3} alt="" />
        <CameraAltOutlinedIcon fontSize="large" />
        <input accept="image/*" type="file" name="image3" onChange={handleChange}/>
        {state.picture?.image3?.url && <div  onClick={(e)=>handleRemoveImage(e,"image3")} className="update">
          <CancelIcon />
      </div>}
      </div>
      <div>
        <img src={state.picture?.image4?.url || state.picture?.image4} alt="" />
        <CameraAltOutlinedIcon fontSize="large" />
        <input accept="image/*" type="file" name="image4" onChange={handleChange}/>
        {state.picture?.image4?.url && <div  onClick={(e)=>handleRemoveImage(e,"image4")} className="update">
          <CancelIcon />
      </div>}
      </div>
      <div>
        <img src={state.picture?.image5?.url || state.picture?.image5} alt="" />
        <CameraAltOutlinedIcon fontSize="large" />
        <input accept="image/*" type="file" name="image5" onChange={handleChange}/>
        {state.picture?.image5?.url && <div  onClick={(e)=>handleRemoveImage(e,"image5")} className="update">
          <CancelIcon />
      </div>}
      </div>
      <div>
        <img src={state.picture?.image6?.url || state.picture?.image6} alt="" />
        <CameraAltOutlinedIcon fontSize="large" />
        <input accept="image/*" type="file" name="image6" onChange={handleChange}/>
        {state.picture?.image6?.url && <div  onClick={(e)=>handleRemoveImage(e,"image6")} className="update">
          <CancelIcon />
      </div>}
      </div>
    </div>
  )

  // return (
  //   <div className="image-wrapper">
  //     <div>
  //       {state.picture?.image1 ? (
  //         <img src={state?.picture?.image1 || state.picture?.image1.url} alt="" />
  //       ) : (
  //         <CameraAltOutlinedIcon fontSize="large"/>
  //       )}
  //       <input accept="image/*" type="file" name="image1" onChange={handleChange}/>
  //     </div>
  //     {(state.picture?.image1) && <div>
  //       {state.picture?.image2 ? (
  //         <img src={state?.picture?.image2 || state.picture?.image2.url} alt="" />
  //       ) : (
  //         <CameraAltOutlinedIcon fontSize="large"/>
  //       )}
  //       <input accept="image/*" type="file" name="image2" onChange={handleChange}/>
  //     </div>}
  //     {(state.picture?.image2) && <div>
  //       {state.picture?.image3 ? (
  //         <img src={state?.picture?.image3 || state.picture?.image3.url} alt="" />
  //       ) : (
  //         <CameraAltOutlinedIcon fontSize="large"/>
  //       )}

  //       <input accept="image/*" type="file" name="image3" onChange={handleChange}/>
  //     </div>}
  //     {(state.picture?.image3) && <div>
  //       {state.picture?.image4 ? (
  //         <img src={state?.picture?.image4 || state.picture?.image4.url} alt="" />
  //       ) : (
  //         <CameraAltOutlinedIcon fontSize="large"/>
  //       )}

  //       <input accept="image/*" type="file" name="image4" onChange={handleChange}/>
  //     </div>}
  //     {(state.picture?.image4) && <div>
  //       {state.picture?.image5 ? (
  //         <img src={state?.picture?.image5 || state.picture?.image5.url} alt="" />
  //       ) : (
  //         <CameraAltOutlinedIcon fontSize="large"/>
  //       )}
  //       <input accept="image/*" type="file" name="image5" onChange={handleChange}/>
  //     </div>}
  //     {(state.picture?.image5) && <div>
  //       {state.picture?.image6 ? (
  //         <img src={state?.picture?.image6 || state.picture?.image6.url} alt="" />
  //       ) : (
  //         <CameraAltOutlinedIcon fontSize="large"/>
  //       )}
  //       <input accept="image/*" type="file" name="image6" onChange={handleChange}/>
  //     </div>}
  //   </div>
  // );
};

export default ImageSection;
