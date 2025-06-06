import React, { useState } from "react";
import { allProduct, clear } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {

  const {searchInput, setSearchInput} = props
  const dispatch = useDispatch();

    const handleSubmit = (event) => {
    event.preventDefault();
  
    if (searchInput.length !== 0) {
      // Detecta si es un código de barra (solo números) o un nombre
      const isCodigoBarra = /^\d+$/.test(searchInput); // Verifica si contiene solo números
      const query = isCodigoBarra
        ? `?codigo_barra=${searchInput}` // Si es código de barra
        : `?nombre=${searchInput}`; // Si es nombre
  
      console.log('Query enviado:', query);
      dispatch(allProduct(query)); // Envía el query al action
    }
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleClear = () => {
    setSearchInput("")
    dispatch(clear())
  }

  const handleAll = () => {
    dispatch(allProduct(""))
  }

  return (
    <div className={styles.container}>
      <form className={styles.container_form} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Ingresa nombre o codigo"
          onChange={handleChange}
          value={searchInput} />
        <button type="submit">Buscar</button>
        <button type="button" onClick={()=>handleClear()}>Limpiar</button>
        <button type="button" onClick={()=>handleAll()}>Todos</button>
      </form>

    </div>
  );
}