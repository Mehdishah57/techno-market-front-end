import React, { useState, useEffect, useRef, useContext } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getCategories from '../../services/getCategories';
import { UserContext } from './../../global/UserContext';
import FormHelperText from '@mui/material/FormHelperText';

const CategorySection = ({ 
  handleCategoryChange, 
  handleSubCategoryChange, 
  errorCategory,
  errorSubCategory,
disabled }) => {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [user, setUser] = useContext(UserContext);

  const fetchData = useRef(null);

  fetchData.current = async() => {
    if(user.categories) return;
    const [data, error] = await getCategories();
    if(!error) setUser({...user, categories: data});
  }

  useEffect(() => {
    fetchData.current();
  }, [])

  const exec = (e,name) => {
    name === "category" ? setMainCategory(e.target.value) : setSubCategory(e.target.value)
  }

  return (
    <div className="category-wrapper">
      <Box marginBottom="10px">
        <FormControl fullWidth>
          <InputLabel style={errorCategory?{color:'#d32f2f'}:{}} id="demo-simple-select-label">Main Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mainCategory}
            label="Age"
            disabled={disabled}
            error={errorCategory}
            onChange={(e)=>{handleCategoryChange(e.target.value);exec(e,"category")}}
          >
            {user.categories?.map(item => <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>)}
          </Select>
          {errorCategory? <FormHelperText style={{color:'#d32f2f'}}>{errorCategory}</FormHelperText>:null}
        </FormControl>
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel style={errorSubCategory?{color:'#d32f2f'}:{}} id="demo-simple-select-label">Sub-Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subCategory}
            name="subCategory"
            label="Age"
            disabled={disabled}
            error={errorSubCategory}
            onChange={(e)=>{handleSubCategoryChange(e.target.value);exec(e,"subCategory")}}
          >
            {user.categories?.map(item => item.name === mainCategory && item.subCategories?.map(itm => <MenuItem key={itm} value={itm}>{itm}</MenuItem>))}
          </Select>
          {errorSubCategory? <FormHelperText style={{color:'#d32f2f'}}>{errorSubCategory}</FormHelperText>:null}
        </FormControl>
      </Box>
    </div>
  )
}

export default CategorySection;