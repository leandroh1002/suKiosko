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

  const filterOrNot = async (idLocalStorage) => {
    if (admin === "undefined" || admin === "true" ) {
      return await getAllPublish(); 
    } else {
      return await getFilteredPublish(idLocalStorage); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await filterOrNot(idLocalStorage);
      dispatch(data);
    };
    
    fetchData();
  }, [dispatch, idLocalStorage]);

  return (
    <div className="flex justify-center pt-60 gap-3">
      <Link to={PATHROUTES.DASHBOARD}><button>Gestionar</button></Link>
      <Link to={PATHROUTES.DASHBOARD}><button>Vender</button></Link>
    </div>
  )
}

export default Home;
