import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FormMail from './FormMail';

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedPublish, setSelectedPublish] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    onSubmit();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const onMailButtonClick = (email) => {
    setEmail(email)
  }

  const onSubmit = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/publishes/all`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selected = data.find(item => item.idPublish === selectedId);
    setSelectedPublish(selected);
  };

  return (
    <div className="container mx-auto p-4  my-16">
      <div className="mb-4">
        <select
          name="publish"
          id="publish"
          onChange={handleSelectChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecciona una publicacion</option>
          {data.map((item) => (
            <option key={item.idPublish} value={item.idPublish}>
              {item.namePublish}
            </option>
          ))}
        </select>
      </div>

      {selectedPublish && (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 rounded-e-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre y Apellido
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  About Me
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Carrera
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Año que cursa
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  cv
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Enviar Mail
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Visto
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedPublish.People.map((person, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {person.fullName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{person.aboutMe}{console.log(person)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {person.Carrers && person.Carrers.length > 0
                        ? person.Carrers.map((carrer) => carrer.name).join(', ')
                        : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {person.yearsOfCarrer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <a href={person.cv} target='_blank'>
                        <button className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Descargar</button>
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                    <button
                      className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => {
                        handleShowForm();
                        onMailButtonClick(person.email);
                      }}>Enviar email</button>
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}{showForm && <FormMail handleShowForm={handleShowForm} email={email} />}
    </div>
  );
}

export default Dashboard;
