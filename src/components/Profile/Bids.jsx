import React, { useState, useContext} from 'react'
import Box from "@mui/material/Box";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../../global/UserContext';
import ProfileBidItem from './ProfileBidItem';
import BidItem from '../BidItem';

const Bids = () => {
  const [value, setValue] = useState('placedBids');
  const [user] = useContext(UserContext);

  const handleChange = (event) => setValue(event.target.value);

  return (
    <Box width='100%' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      <Box width="90%" maxWidth='440px'>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          value={value}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="placedBids">Placed Bids</MenuItem>
          <MenuItem value="recievedBids">Recieved Bids</MenuItem>
        </Select>
      </Box>
      <Box marginTop='20px' width='100%' maxWidth='650px' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        {/* {value === "placedBids"? 
          bids.map(item => item.by._id === user._id? <ProfileBidItem bid={item} type={value} /> : null)
        :bids.map(item => item.productOwner === user._id? <ProfileBidItem bid={item} type={value} /> : null)} */}
        {user[value].map(item => <ProfileBidItem bid={item} type={value} />)}
      </Box>
    </Box>
  )
}

export default Bids