import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TableUser from '../TableUser/TableUser';
import { useSelector } from 'react-redux';

function FindUserAdmin() {

  const productos = useSelector((state) => state.productForAdmin);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="p-4 bg-white rounded-lg shadow h-full flex flex-col">
        <div className="mb-4">
            <p className="text-lg font-semibold">Buscar Producto</p>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
        </div>
        <div className="flex-grow">
            <TableUser productos={productos} searchInput={searchInput} />
        </div>
    </div>
  );
}

export default FindUserAdmin;
