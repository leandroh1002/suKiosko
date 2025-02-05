import React from 'react'
import SearchBar from './SearchBar'
import TableProduct from './TableProduct'

function ListaProducto() {
  return (
    <div>ListaProducto
      <p>Barra de busqueda</p><SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
      <p>Lista de productos</p><TableProduct people={people} onMailButtonClick={onMailButtonClick} handleShowForm={handleShowForm} searchInput={searchInput} />
      <button>Cancelar</button>
      <p>Total:</p>
    </div>
  )
}

export default ListaProducto