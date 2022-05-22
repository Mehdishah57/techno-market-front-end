import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CategoryFilterSection from './CategoryFilterSection';
import SearchSection from '../SearchSection';
import getProducts from '../../services/getProducts';
import ProductItem from '../ProductItem';
import ProductSkeletonList from '../ProductSkeletonList';
import HomePageControl from '../HomePageControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const SearchHome = ({ filters, setFilters, search, setSearch }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const fetchProducts = useRef();

  fetchProducts.current = async (payload) => {
    try {
      setLoading(true);
      const { data, error } = await getProducts(payload);
      if (error) console.log(error);
      setProducts(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts.current({ pageNumber, search, filters });
  }, [pageNumber, search, filters]);

  const nextPage = () => products.length >= 10 && setPageNumber(prevNumber => prevNumber + 1)

  const previousPage = () => pageNumber > 1 && setPageNumber(prevNumber => prevNumber - 1)

  const handlePriceSortChange = e => setFilters({...filters, priceSort:[e.target.value]});

  const handleChange = e => {
    const price = parseInt(e.target.value);
    if(Number.isNaN(price)) return;
    setFilters({...filters, [e.target.name]: e.target.value});
  }

  return (
    <Box
      display='flex'
      width='100%'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <CategoryFilterSection filters={filters} setFilters={setFilters} />
      <Box
        width='100%'
        display='flex'
        gap="10px"
        flexDirection='row'
        padding='10px'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
      >
        <SearchSection
          loading={loading}
          setLoading={setLoading}
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        width='100%'
        flexWrap='wrap'
        gap='10px'
      >
        <Box 
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='row'
          gap='10px'
        >
          <TextField 
            variant='outlined'
            label='Min Price'
            name="Minimum Price"
            size='small'
            onChange={handleChange}
          />
          <TextField 
            variant='outlined'
            label='Max Price'
            size='small'
            name="Maximum Price"
            onChange={handleChange}
          />
        </Box>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handlePriceSortChange}
          >
            <FormControlLabel value={-1} control={<Radio />} label="High to Low" />
            <FormControlLabel value={1} control={<Radio />} label="Low to High" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap='20px'
        padding='10px'
        flexWrap='wrap'
        overflow='hidden'
      >
        {loading ?
          <ProductSkeletonList number={12} />
          : products.map(product => <ProductItem product={product} key={product._id} />)}
        {!products.length && !loading && <Box
          width='100%'
          textAlign='center'
          fontWeight='bold'
        >
          No Results
        </Box>}
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        width='100%'
      >
        <HomePageControl pageNumber={pageNumber} nextPage={nextPage} previousPage={previousPage} />
      </Box>
    </Box>
  )
}

export default SearchHome