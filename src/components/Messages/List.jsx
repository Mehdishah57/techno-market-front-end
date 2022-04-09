import React, {useState, useEffect, useRef} from 'react'
import getLists from '../../services/getLists';
import ListItem from './ListItem';
import { Toaster, toast } from 'react-hot-toast';

import "../../styles/Messages/list.scss";

const List = () => {
  const [list, setList] = useState([]);
  const fetchLists = useRef(null);

  fetchLists.current = async() => {
    const [data, error] = await getLists();
    if(error) return toast.error(error.response?.data);
    setList(data);
  }

  useEffect(()=>{
    fetchLists.current();
  },[])

  return (
    <div className='list-wrapper'>
      <Toaster />
      {list.map( item => <ListItem key={item._id} item={item} />)}    
    </div>
  )
}

export default List