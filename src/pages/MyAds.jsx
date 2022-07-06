import React, {useState, useRef, useEffect} from 'react';
import getMyAds from './../services/getMyAds';
import { Toaster, toast } from 'react-hot-toast';
import MyCard from './../components/MyAds/MyCard';
import deleteAd from './../services/deleteAd';
import AlertDialog from './../components/AlertDialog';
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import activation from '../services/productActivation';
import CircularProgress from '@mui/material/CircularProgress';

import "../styles/MyAds/myads.scss";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const fetchAds = useRef(null);
  const navigate = useNavigate();

  fetchAds.current = async() => {
    setLoading(true)
    const [data, error] = await getMyAds();
    if(error) toast.error(error.response.data);
    else setAds(data);
    setLoading(false);
  }

  useEffect(()=>{
    fetchAds.current();
  },[])

  const handleActivation = async(id) => {
    const temp = ads.map(ad => {
      if(ad._id === id) ad.isActive=!ad.isActive;
      return ad;
    })
    setAds(temp);
    await activation(id);
  }

  const deleteMyAd = async(id) => {
    const [, error] = await deleteAd(id);
    if(!error) toast.success(`Your Ad was successfully deleted! 🤞😉`);
    const temp = ads.filter(ad => ad._id !== id);
    setAds(temp);
  }

  const handleDelete = (id) => {setId(id);setOpen(true);}

  if(loading) return <div className='myads-wrapper'>
    <CircularProgress thickness={4} />
  </div>
  return (
    <div className='myads-wrapper'>
      <Toaster />
      <Box display='flex' justifyContent='center' alignItems='center' fontSize="18px" width="100%" textAlign="center" margin="10px" fontWeight='bold'>
            <ArrowBackIcon onClick={() => navigate(-1)} style={{ marginRight: 5, cursor: 'pointer' }}></ArrowBackIcon> My Ads
            </Box>
      <AlertDialog 
        open={open} 
        setOpen={setOpen} 
        task={deleteMyAd}
        taskArguments={[id]}
        title="Are you sure you want to delete this item? 😗😗😗"
        message="This action is permanent and irreversible 😁😁😁" 
      />
      {ads.map(item => <MyCard key={item._id} item={item} handleActivation={handleActivation} handleDelete={handleDelete} />)}
    </div>
  )
}

export default MyAds