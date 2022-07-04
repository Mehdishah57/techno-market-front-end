import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { UserContext } from '../global/UserContext';
import fetchBids from './../services/fetchBids';
import BidItem from './BidItem';

const ProductBids = ({ productId }) => {
  const [bids, setBids] = useState([]);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(3);
  const [user, setUser] = useContext(UserContext);

  const fetchProductBids = useRef();

  fetchProductBids.current = async () => {
    const [data, error] = await fetchBids(pageNumber, pageSize, productId);
    if (!error) setBids(data);
    if (error) console.log(error.message)
  }

  useEffect(() => {
    fetchProductBids.current();
  }, [])

  const deleteBids = async(id) => {
    let temp = bids.filter(bid => bid._id !== id);
    let placedBids = user.placedBids.filter(bid => bid._id !== id);
    let recievedBids = user.recievedBids.filter(bid => bid._id !== id);
    setUser({...user, placedBids, recievedBids});
    setBids(temp);
  }

  if(!bids.length) return null
  return <div className="product-bids-wrapper">
    <h2>Bids</h2>
    {bids.map(bid => <BidItem bid={bid} key={JSON.stringify(bid)} deletebid={deleteBids} />)}
  </div>;
};

export default ProductBids;
