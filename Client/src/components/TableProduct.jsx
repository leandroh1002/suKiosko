import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { allProduct } from '../redux/actions';
import Swal from 'sweetalert2';

function TableProduct(props) {

  const { people, searchInput, onMailButtonClick, handleShowForm } = props
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const handleChangeStatus = async (idPeople, state) => {
    const auxState = state === "Active" ? "Inactive" : "Active";
    const response = await axios.put(`${REACT_APP_API_URL}/people`, {
      "idPeople": idPeople,
      "state": auxState
    });
    if (response.status === 200) {
      if (searchInput.length != 0) {
        const query = `&fullName=${searchInput}`
        dispatch(allProduct(query))
      } else {
        dispatch(allProduct(""))
      }
    } else {
      Swal.fire({
        title: 'Error al cambiar el estado del usuario',
        text: 'Por favor, notifique a los programadores',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  const handleChangeCancel = async (idPeople, state) => {
    const auxState = state === "Deleted" ? "Active" : "Deleted";
    const response = await axios.put(`${REACT_APP_API_URL}/people`, {
      "idPeople": idPeople,
      "state": auxState
    });
    if (response.status === 200) {
      if (searchInput.length != 0) {
        const query = `&fullName=${searchInput}`
        dispatch(allProduct(query))
      } else {
        dispatch(allProduct(""))
      }
    } else {
      Swal.fire({
        title: 'Error al cambiar el estado del usuario',
        text: 'Por favor, notifique a los programadores',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  return (
    <div className="">
      <div className="">
        <table className="">
          <thead>
            <tr>
              <th className="">Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th className="">Telefono</th>
              <th className="">Tipo de Usuario</th>
              <th className="">Estado</th>
              <th className="">Ultimo Pago</th>
              <th className="">Antigüedad</th>
              <th></th>
              <th></th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {people && people.map((person) => (
              <tr key={person.people.idPeople}>
                <td className="">{person.people.fullName}</td>
                <td>{person.people.email}</td>
                <td className="">{person.people.phone}</td>
                <td className="">{person.people.typeOfPerson}</td>
                <td className="">{person.people.state}</td>
                <td className="">{person.people.pago || "No data"}</td>
                <td className="">{person.people.dateOfAdmission}</td>
                <td><button
                  className=""
                  onClick={() => {
                    handleShowForm();
                    onMailButtonClick(person.people.email);
                  }}>Enviar email</button></td>
                <td>
                  {
                    person.people.state != "Unverified" &&
                    <button
                      className={person.people.state === "Active" ? styles.inactivo : styles.activo}
                      type="button"
                      onClick={() => handleChangeStatus(person.people.idPeople, person.people.state)}
                    >
                      {person.people.state === "Active" ? "Desactivar" : "Activar"}
                    </button>
                  }
                </td>
                <td className={styles.lastTd}>
                  {
                    person.people.state != "Deleted" &&
                    <button
                      className={styles.cancel}
                      type="button"
                      onClick={() => handleChangeCancel(person.people.idPeople, person.people.state)}
                    >
                      Cancelar
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TableProduct;
