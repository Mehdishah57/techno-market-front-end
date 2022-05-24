import React, { useState, useEffect, useRef, useContext } from 'react';
import ProductItem from './../components/ProductItem';
import getFavourites from './../services/getFavourites';
import ProductSkeletonList from '../components/ProductSkeletonList';
import { UserContext } from './../global/UserContext';
import { Toaster, toast } from 'react-hot-toast';

import "../styles/favourites.scss";

const Favourites = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useContext(UserContext);
    const fetchData = useRef(null);

    fetchData.current = async() => {
      setLoading(true);
      const [data, error] = await getFavourites(user.favourites);
      if(error) toast.error(error.response?.data || error.message || "There was an error loading your favourites");
      setProducts(data || []);
      setLoading(false);
    }

    useEffect(()=>{
        fetchData.current();
    },[])

  return (
    <div className='favourites-wrapper'>
      <Toaster />
        {products.length ? products.map(product => <ProductItem key={product._id} product={product} />): null}
        {loading && <ProductSkeletonList number={6} />}
        {!products.length && !loading && <span>You don't have any favourites 💘💘</span>}
    </div>
  )
}

export default Favourites;