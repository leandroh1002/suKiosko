
import React, { useState, useEffect } from 'react';
import styles from './Rubros.module.scss'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import PATHROUTES from '../helpers/PathRoutes.helper';

const Rubros = () => {
  const [rubros, setRubros] = useState([]);
  const [newRubroName, setNewRubroName] = useState('');
  const [selectedRubroId, setSelectedRubroId] = useState('');
  const [updatedRubroName, setUpdatedRubroName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

  // Fetch all rubros on component mount
  const fetchRubros = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${REACT_APP_API_URL}/rubros`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRubros(data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los rubros. Por favor, intente de nuevo más tarde.');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRubros();
  }, []);

  // Handle adding a new rubro
  const handleAddRubro = async (e) => {
    e.preventDefault();
    if (!newRubroName.trim()) {
      setError('El nombre del rubro no puede estar vacío.');
      return;
    }
    try {
      const response = await fetch(`${REACT_APP_API_URL}/rubros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: newRubroName }),
      });
      if (!response.ok) {
        throw new Error('Failed to add rubro');
      }
      setNewRubroName('');
      await fetchRubros(); // Refresh the list
    } catch (error) {
      setError('Error al agregar el rubro.');
      console.error('Add error:', error);
    }
  };

  // Handle updating an existing rubro
  const handleUpdateRubro = async (e) => {
    e.preventDefault();
    if (!selectedRubroId) {
      setError('Por favor, seleccione un rubro para actualizar.');
      return;
    }
    if (!updatedRubroName.trim()) {
      setError('El nuevo nombre del rubro no puede estar vacío.');
      return;
    }
    try {
      const response = await fetch(`${REACT_APP_API_URL}/rubros/${selectedRubroId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: updatedRubroName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update rubro');
      }
      setUpdatedRubroName('');
      setSelectedRubroId('');
      await fetchRubros(); // Refresh the list
    } catch (error) {
      setError('Error al actualizar el rubro.');
      console.error('Update error:', error);
    }
  };
  
    // Set the input field for update with the name of the selected rubro
    useEffect(() => {
        const selectedRubro = rubros.find(r => r.id === parseInt(selectedRubroId));
        if (selectedRubro) {
            setUpdatedRubroName(selectedRubro.nombre);
        }
    }, [selectedRubroId, rubros]);


  return (
    <div className={styles.container}>
      <h2>Gestión de Rubros</h2>

      {error && <p className={styles.error}>{error}</p>}
        <Link to={PATHROUTES.GESTIONAR}><button className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Volver</button></Link>

      {/* Add New Rubro Form */}
      <div className={styles.formSection}>
        <h3>Agregar Nuevo Rubro</h3>
        <form onSubmit={handleAddRubro}>
          <input
            type="text"
            value={newRubroName}
            onChange={(e) => setNewRubroName(e.target.value)}
            placeholder="Nombre del nuevo rubro"
          />
          <button type="submit">Agregar</button>
        </form>
      </div>

      {/* Update Existing Rubro Form */}
      <div className={styles.formSection}>
        <h3>Modificar Rubro Existente</h3>
        <form onSubmit={handleUpdateRubro}>
          <select
            value={selectedRubroId}
            onChange={(e) => setSelectedRubroId(e.target.value)}
          >
            <option value="">-- Seleccione un rubro --</option>
            {rubros.map((rubro) => (
              <option key={rubro.id} value={rubro.id}>
                {rubro.nombre}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={updatedRubroName}
            onChange={(e) => setUpdatedRubroName(e.target.value)}
            placeholder="Nuevo nombre del rubro"
            disabled={!selectedRubroId}
          />
          <button type="submit" disabled={!selectedRubroId}>Actualizar</button>
        </form>
      </div>

      {/* List of Rubros */}
      <div className={styles.listSection}>
        <h3>Listado de Rubros</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {rubros.length > 0 ? (
              rubros.map((rubro) => (
                <li key={rubro.id}>{rubro.nombre}</li>
              ))
            ) : (
              <p>No hay rubros para mostrar.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Rubros;
