import React, { useEffect, useRef, useState } from 'react';
import SearchSection from './../components/SearchSection';
import HomePageControl from '../components/HomePageControl';
import getProducts from '../services/getProducts';

import "../styles/home.scss";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchProducts = useRef();

    fetchProducts.current = async() => {
        const { data, error } = await getProducts(pageNumber);
        if(error) return console.log(error);
        setProducts(data);
    }

    useEffect(()=>{
        fetchProducts.current();
    },[pageNumber])

    const nextPage = () => products.length > 19 && setPageNumber(prevNumber => prevNumber + 1)

    const previousPage = () => pageNumber > 1 && setPageNumber(prevNumber => prevNumber - 1)

    return (
        <div className="home-wrapper">
            <SearchSection />
            <HomePageControl 
                pageNumber={pageNumber} 
                nextPage={nextPage} 
                previousPage={previousPage} 
            />
        </div>
    )
}

export default Home;
