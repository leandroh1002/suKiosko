import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PATHROUTES from '../helpers/PathRoutes.helper';

function ButtonBack({ props, type }) {
  const userLoggedInfo = useSelector(state => state.UserLogued);
  console.log(userLoggedInfo);

  const destinationPath = userLoggedInfo && Object.keys(userLoggedInfo).length > 0 ? PATHROUTES.HOME : PATHROUTES.LANDING;

  return (
    <Link to={destinationPath}>
      <button 
        type={type} 
        value={userLoggedInfo.idPeople} 
        className="inline-flex text-white mx-4 bg-[#ca7d10] border-0 py-2 px-6 focus:outline-none hover:bg-[#ca7d10] rounded text-lg"
      >
        {props}
      </button>
    </Link>
  );
}

export default ButtonBack;
