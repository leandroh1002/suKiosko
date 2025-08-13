import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allProduct, clear, addProductToCart, updateProductQuantity } from "../../redux/actions";
import Swal from 'sweetalert2';

export default function SearchBar(props) {
  const { searchInput, setSearchInput } = props;
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.productForAdmin);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(allProduct(""));
    }
  }, [dispatch, allProducts.length]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);

    const productFound = allProducts.find(p => p.codigo_barra === newValue);

    if (productFound) {
      const productInCart = cart.find(p => p.id === productFound.id);
      if (productInCart) {
        dispatch(updateProductQuantity(productInCart.id, productInCart.cantidad + 1));
      } else {
        dispatch(addProductToCart(productFound, 1));
      }
      
      Swal.fire({
        title: '¡Agregado!',
        text: `${productFound.nombre} ha sido agregado al carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
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
    <div className="mt-2">
      <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Escanear código o buscar por nombre..."
          onChange={handleChange}
          value={searchInput}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Buscar</button>
        <button type="button" onClick={handleClear} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Limpiar</button>
        <button type="button" onClick={handleAll} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Todos</button>
      </form>
    </div>
  );
}

