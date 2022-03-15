import React, { useState, useEffect, useRef, useContext } from 'react';
import ProductItem from './../components/ProductItem';
import getFavourites from './../services/getFavourites';
import { UserContext } from './../global/UserContext';
import { Toaster, toast } from 'react-hot-toast';

import "../styles/favourites.scss";

const Favourites = () => {
    const [products, setProducts] = useState([]);
    const [user] = useContext(UserContext);
    const fetchData = useRef(null);

    fetchData.current = async() => {
      const [data, error] = await getFavourites(user.favourites);
      if(error) return toast.error(error.response?.data || error.message || "There was an error loading your favourites");
      setProducts(data);
    }

    useEffect(()=>{
        fetchData.current();
    },[])

  return (
    <div className='favourites-wrapper'>
      <Toaster />
        {products.length ? products.map(product => <ProductItem key={product._id} product={product} />): null}
        {!products.length && <span>You don't have any favourites 💘💘</span>}
    </div>
  )
}

export default Favourites;