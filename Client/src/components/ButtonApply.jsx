import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";

function ButtonApply({ props, type, value, idPublish, onSuccess }) {  // Añadido onSuccess
    const userLoggedInfo = useSelector(state => state.UserLogued);
  
    const handleApply = async (value, idPublish) => {
        try {
            const apply = await axios.post(`/people`, { value, idPublish });
            if (apply.status === 201) {
                Swal.fire({
                    title: "Postulado Correctamente",
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                onSuccess();  // Llamar a la función de éxito
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button 
            type={type} 
            value={userLoggedInfo.idPeople} 
            onClick={() => handleApply(value, idPublish)} 
            className="inline-flex text-white mx-4 bg-[#246bd6] border-0 py-2 px-6 focus:outline-none hover:bg-[#184ca0] rounded text-lg"
        >
            {props}
        </button>
    );
}

export default ButtonApply;
