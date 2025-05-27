import React, { useState } from "react";
import { allProduct, clear } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function SearchBar(props) {

  const {searchInput, setSearchInput} = props
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchInput.length != 0) {
      const query = `&fullName=${searchInput}`
      dispatch(allProduct(query))
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
    <div className="">
      <form className="" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Buscar usuario por Nombre Completo"
          onChange={handleChange}
          value={searchInput} />
        <button type="submit">Buscar</button>
        <button type="button" onClick={()=>handleClear()}>Limpiar</button>
        <button type="button" onClick={()=>handleAll()}>Todos</button>
      </form>

    </div>
  );
}