import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allProduct, clear, addProductToCart } from "../../redux/actions";
import Swal from 'sweetalert2';
import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {
  const { searchInput, setSearchInput } = props;
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.productForAdmin);

  // Cargar todos los productos al montar el componente si no están cargados
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(allProduct(""));
    }
  }, [dispatch, allProducts.length]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);

    // Lógica para el escáner de código de barras
    const productFound = allProducts.find(p => p.codigo_barra === newValue);

    if (productFound) {
      dispatch(addProductToCart(productFound, 1));
      Swal.fire({
        title: '¡Agregado!',
        text: `${productFound.nombre} ha sido agregado al carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      // Limpiar el input para el siguiente escaneo
      // Usamos un timeout para asegurar que el estado se actualice antes de limpiar
      setTimeout(() => setSearchInput(""), 100);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchInput.length > 0) {
      const query = `?nombre=${searchInput}`;
      dispatch(allProduct(query));
    }
  };

  const handleClear = () => {
    setSearchInput("");
    dispatch(clear());
  };

  const handleAll = () => {
    dispatch(allProduct(""));
  };

  return (
    <div className={styles.container}>
      <form className={styles.container_form} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Escanear código o buscar por nombre..."
          onChange={handleChange}
          value={searchInput} />
        <button type="submit">Buscar</button>
        <button type="button" onClick={handleClear}>Limpiar</button>
        <button type="button" onClick={handleAll}>Todos</button>
      </form>
    </div>
  );
}