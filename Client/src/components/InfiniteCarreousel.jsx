import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../redux/actions';

function InfiniteCarreousel() {
  const allCompanies = useSelector((state) => state.allCompanies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  //console.log(allCompanies);

  return (
    <div id='carrousel' className='flex space-x-16 overflow-hidden group bg-[#194da0]'>
      <div className='flex space-x-16 animate-loop-scroll group-hover:paused'>
        {allCompanies.map((company, index) => (
          <img
            key={index}
            src={company.image}
            alt={company.name}
            loading='lazy'
            className='max-w-[200px] grayscale h-[100px]'
          />
        ))}
      </div>
      <div className='flex space-x-16 animate-loop-scroll group-hover:paused' aria-hidden="true">
        {allCompanies.map((company, index) => (
          <img
            key={index + allCompanies.length} // Para asegurar un key único
            src={company.image}
            alt={company.name}
            loading='lazy'
            className='max-w-[200px] grayscale h-[100px]'
          />
        ))}
      </div>
    </div>
  );
}

export default InfiniteCarreousel;
