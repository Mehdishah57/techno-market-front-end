import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import fetchBids from './../services/fetchBids';
import BidItem from './BidItem';
import Button from '@mui/material/Button';

const ProductBids = ({ productId, tempBidItem }) => {
  const [bids, setBids] = useState([]);
  const [showTempBid, setShowTempBid] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(3);

  const fetchProductBids = useRef();
  const updateBid = useRef();

  fetchProductBids.current = async () => {
    const [data, error] = await fetchBids(pageNumber, pageSize, productId);
    if (!error) setBids([...bids,...data]);
    if (error) console.log(error.message)
  }

  updateBid.current = (tempBidItem) => {
    if(!tempBidItem?.userId) return;
    if(!bids.length) return
    let temp = bids.filter(item => item.userId !== tempBidItem.userId);
    temp.push(tempBidItem);
    setBids(temp);
    setShowTempBid(false);
  }

  useLayoutEffect(()=>{
    updateBid.current(tempBidItem);
  },[tempBidItem])

  useEffect(() => {
    fetchProductBids.current();
  }, [])

  const deleteBids = async(id) => {
    let temp = bids.filter(bid => bid._id !== id);
    setBids(temp);
  }

  const handleClick = () => {
    if(bids.length === pageSize)
      setPageNumber(prevNo => prevNo + 2)
  }

  if(!bids.length) return null
  return <div className="product-bids-wrapper">
    <h2>Bids</h2>
    {bids.map(bid => <BidItem bid={bid} key={JSON.stringify(bid)} deletebid={deleteBids} />)}
    {tempBidItem.userId && showTempBid && <BidItem bid={tempBidItem} deletebid={deleteBids} />}
    <Button className="b0011" variant="outlined" onClick={handleClick}>
      Load More
    </Button>
  </div>;
};

export default ProductBids;
