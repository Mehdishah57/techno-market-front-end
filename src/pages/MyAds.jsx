import React, {useState, useRef, useEffect} from 'react';
import getMyAds from './../services/getMyAds';
import { Toaster, toast } from 'react-hot-toast';
import MyCard from './../components/MyAds/MyCard';
import deleteAd from './../services/deleteAd';
import AlertDialog from './../components/AlertDialog';

import "../styles/MyAds/myads.scss";
import activation from '../services/productActivation';

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const fetchAds = useRef(null);

  fetchAds.current = async() => {
    const [data, error] = await getMyAds();
    console.log(data)
    if(!error) return setAds(data);
    toast.error(error.response.data);
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

  return (
    <div className='myads-wrapper'>
      <Toaster />
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