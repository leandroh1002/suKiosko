import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllPublish, getFilteredPublish } from "../../redux/actions/index";
import Hero from '../Hero';
import StoreItem from "../../helpers/LocalStorage";
import { Link } from 'react-router-dom';
import PATHROUTES from '../../helpers/PathRoutes.helper';


function Home() {
  const allPublishes = useSelector((state) => state.allPublish);
  const allFilteredPublishes = useSelector((state) => state.FilteredPublish);
  const dispatch = useDispatch();
  const idLocalStorage = JSON.parse(localStorage.getItem("idCarrer"));
  const admin = localStorage.getItem(StoreItem.isAdmin);

  // const filterOrNot = async (idLocalStorage) => {
  //   if (admin === "undefined" || admin === "true" ) {
  //     return await getAllPublish(); 
  //   } else {
  //     return await getFilteredPublish(idLocalStorage); 
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await filterOrNot(idLocalStorage);
  //     dispatch(data);
  //   };
    
  //   fetchData();
  // }, [dispatch, idLocalStorage]);

  return (
    <div className="flex justify-center pt-60 gap-3">
      <Link to={PATHROUTES.GESTIONAR}><button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Gestionar</button></Link>
      <Link to={PATHROUTES.VENDER}><button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Vender</button></Link>
    </div>
  )
}

export default Home;
