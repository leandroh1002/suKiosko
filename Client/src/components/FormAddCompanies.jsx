import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ButtonDefault from './ButtonDefault';
import axios from 'axios';
import UploadWidget from './UploadWidget';
import ButtonBack from './ButtonBack';
import Swal from "sweetalert2";


const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

function FormAddCompanies() {

  return (
    <>
      <ButtonBack type="button" props="Volver"/>
      <Formik
        initialValues={{
          name: '',
          description: '',
          image: '',
          duration: '',
        }}
        validate={(values) => {
          let errors = {};

          // Validación nombre
          if (!values.name) {
            errors.name = 'Ingresa la Carrera';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = 'El nombre solo puede tener Letras y Espacios';
          }

          // Validación de la description
          if (!values.description) {
            errors.description = 'Ingresa una descripción';
          } else if (values.description.length > 40) {
            errors.description = 'La descripción no puede tener más de 40 caracteres';
          }

          // Validación de la imagen (URL)
          if (!values.image) {
            errors.image = 'Ingresa la URL de la imagen';
          } else if (!/^https?:\/\/\S+$/.test(values.image)) {
            errors.image = 'Ingresa una URL válida';
          }

          // Validación de la duration
          if (!values.duration) {
            errors.duration = 'Aquí va la duración de la carrera';
          } else if (!/^\d+$/.test(values.duration)) {
            errors.duration = 'Solo números';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          axios.post(`${REACT_APP_API_URL}/companies`, values)
            .then((response) => {
              if (response.status === 201 || response.status === 200) {
                Swal.fire({
                  title: "Empresa Agregada Correctamente",
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
                resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                title: `${error.response.data.error}`,
                icon: 'warning',
                confirmButtonText: 'Volver'
              });
            });
          console.log(values)
        }}
      >
        {({ errors, setFieldValue }) => (
          <Form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Agregar Empresas</h2>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Nombre: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="name"
                name="name"
                placeholder="Ej. EDET"
              />
              <ErrorMessage name="name" component={() => (<div className="error">{errors.name}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="description" className="leading-7 text-sm text-gray-600">Descripción: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="description"
                name="description"
                placeholder="Descripción"
              />
              <ErrorMessage name="description" component={() => (<div className="error">{errors.description}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="image" className="leading-7 text-sm text-gray-600">Imagen: </label>
              <UploadWidget
                setPublicId={(imageUrl) => setFieldValue('image', imageUrl)} // Actualizamos el valor del campo 'image' en Formik
              />
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="image"
                name="image"
                placeholder="URL"
              />
              <ErrorMessage name="image" component={() => (<div className="error">{errors.image}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="duration" className="leading-7 text-sm text-gray-600">Duración: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="number"
                id="duration"
                name="duration"
                placeholder="Duracion de la Pasantia"
              />
              <ErrorMessage name="duration" component={() => (<div className="error">{errors.duration}</div>)} />
            </div>
            <ButtonDefault type="submit" props="Enviar"></ButtonDefault>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormAddCompanies;
