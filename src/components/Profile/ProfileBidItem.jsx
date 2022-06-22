import React from 'react';
import formatDate from '../../utils/formateDate';
import { useNavigate } from 'react-router-dom';

import "../../styles/biditem.scss";

const ProfileBidItem = ({bid, type}) => {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/home/item/"+(bid.productId?._id || bid.data?.productId?._id))
  }

  return (
		<div style={{flexDirection: 'column', alignItems: 'flex-start', position: 'relative', minHeight: '120px'}} className="bid-item" onClick={handleClick}>
			<img src={bid.productId?.picture?.image1?.url || bid.data?.productId?.picture?.image1?.url} 
        alt='' 
        style={{width:'100px', height: "100px", position: 'absolute', right: "20px"}} 
      />
			{bid.by && <div className="bid-by">Title: {bid.productId?.title || bid.data?.productId?.title}</div>}
      {type==="recievedBids"? <div>By: {bid.by.name}</div>: null}
			<div className="bid-price">Bid: {bid.price}</div>
			<div className="time">{formatDate(bid.at)}</div>
		</div>
  )
}

export default ProfileBidItem