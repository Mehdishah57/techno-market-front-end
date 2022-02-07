import React, { useState, useRef, useEffect } from 'react';
import fetchBids from './../services/fetchBids';
import BidItem from './BidItem';

const ProductBids = ({productId}) => {
    const [bids, setBids] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(3);

    const fetchProductBids = useRef();

    fetchProductBids.current = async() => {
		const [data, error] = await fetchBids(pageNumber, pageSize, productId);
		if(!error) setBids(data)
	}

    useEffect(()=>{
        fetchProductBids.current();
    },[])

  return <>
    {bids.map( bid => <BidItem bid={bid} key={JSON.stringify(bid)} /> )}
  </>;
};

export default ProductBids;
