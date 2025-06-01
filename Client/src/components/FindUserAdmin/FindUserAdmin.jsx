import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TableUser from '../TableUser/TableUser';
import styles from "./FindUserAdmin.module.scss";
import { useDispatch, useSelector } from 'react-redux';

function FindUserAdmin() {

  const productos = useSelector((state) => state.productForAdmin);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={styles.background}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p className={styles.title}>Buscar Producto</p>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
          </div>
          <TableUser productos={productos} searchInput={searchInput} />
        </div>
    </div>
  );
}

export default FindUserAdmin;
