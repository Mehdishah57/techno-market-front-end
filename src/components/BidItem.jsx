import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import "../styles/biditem.scss";

const BidItem = ({bid}) => {
    return (
        <div className="bid-item">
            <div className="icon">
                <PersonOutlineIcon fontSize="large" />
            </div>
            <div className="bid-price">RS: {bid.price}</div>
            <div className="time">{(new Date(bid.at)).getHours()}:{(new Date(bid.at).getMinutes())}</div>
        </div>
    )
}

export default BidItem;
