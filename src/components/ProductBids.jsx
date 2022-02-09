import React, { useState, useRef, useEffect } from 'react';
import fetchBids from './../services/fetchBids';
import BidItem from './BidItem';
import Button from '@mui/material/Button';

const ProductBids = ({ productId }) => {
  const [bids, setBids] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(3);

  const fetchProductBids = useRef();

  fetchProductBids.current = async () => {
    const [data, error] = await fetchBids(pageNumber, pageSize, productId);
    if (!error) setBids(data);
    if (error) console.log(error.message)
    console.log(data);
  }

  useEffect(() => {
    fetchProductBids.current();
  }, [])

  const handleClick = () => {
    setPageNumber(prevNo => prevNo + 2)
  }

  return <div className="product-bids-wrapper">
    <h2>Bids</h2>
    {bids.map(bid => <BidItem bid={bid} key={JSON.stringify(bid)} />)}
    <Button className="b0011" variant="outlined" onClick={handleClick}>
      Load More
    </Button>
  </div>;
};

export default ProductBids;
