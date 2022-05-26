import React from 'react';
import { useNavigate } from "react-router-dom";
import ProductImage from './../ProductImage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import "../../styles/MyAds/mycard.scss";

const MyCard = ({ item, handleDelete, handleActivation }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sell/${item._id}`);
  }

  const handleProduct = () => navigate(`/home/item/${item._id}`)

  return (
    <div className='mycard-wrapper'>
      <div className="menu">
        <div onClick={() => handleDelete(item._id)} className='icons'>
          <CloseIcon color='error' />
        </div>
        <div onClick={handleClick} className='icons'><EditIcon color='info' /></div>
        {item.isActive && <div onClick={()=>handleActivation(item._id)} className='icons'>
          <VisibilityIcon color='success' />
        </div>}
        {!item.isActive && <div onClick={()=>handleActivation(item._id)} className='icons'>
          <VisibilityOffIcon color='warning' />
        </div>}
      </div>
      <ProductImage handleClick={handleProduct} product={item} />
      <div className="info">
        <div className="title">{item.title}</div>
        <div className="price">RS: {item.price}</div>
        <div className="city">{item.location?.city}</div>
      </div>
    </div>
  )
}

export default MyCard;