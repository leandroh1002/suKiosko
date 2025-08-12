import React, { useState } from 'react';
import axios from 'axios';

const UploadExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        setMessage('Por favor, selecciona un archivo Excel.');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      // Asegúrate de que la URL coincida con tu configuración de backend
      const response = await axios.post('http://localhost:3031/productos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
console.log(response, "formData");

      setMessage(response.data.message + ' ' + response.data.summary);
      setSelectedFile(null); // Limpiar el input después de la subida exitosa
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setMessage('Error al subir el archivo: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '500px', margin: '20px auto' }}>
      <h2>Subir Archivo de Productos (Excel)</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ marginBottom: '10px', display: 'block' }}
      />
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: selectedFile ? 'pointer' : 'not-allowed',
        }}
      >
        Subir Excel
      </button>
      {message && <p style={{ marginTop: '10px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default UploadExcel;
