import React, { useState, useEffect, useRef, useContext } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getCategories from '../../services/getCategories';
import { UserContext } from './../../global/UserContext';

const CategorySection = ({ state, setState }) => {
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

  const handleChange = (e,name) => {
    setState({ ...state, [name]: e.target.value })
    name === "category" ? setMainCategory(e.target.value) : setSubCategory(e.target.value)
  }

  return (
    <div className="category-wrapper">
      <Box >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mainCategory}
            label="Age"
            onChange={(e)=>handleChange(e,"category")}
          >
            {user.categories?.map(item => <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <Box  marginTop={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subCategory}
            name="subCategory"
            label="Age"
            onChange={(e)=>handleChange(e,"subCategory")}
          >
            {user.categories?.map(item => item.name === mainCategory && item.subCategories?.map(itm => <MenuItem key={itm} value={itm}>{itm}</MenuItem>))}
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default CategorySection;