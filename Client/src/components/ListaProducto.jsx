import React, { useState } from 'react';
import FindUserAdmin from './FindUserAdmin/FindUserAdmin';

function ListaProducto() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
    {/* <div className='grid min-h-[90dvh] grid-rows-[1fr_auto] m-5'> */}
      <content><FindUserAdmin searchInput={searchInput} /></content>
    </div>
  );
}

export default ListaProducto;