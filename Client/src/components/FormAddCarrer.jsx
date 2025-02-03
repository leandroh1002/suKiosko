import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ButtonDefault from './ButtonDefault';
import axios from 'axios';
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
          department: '',
          duration: '',
        }}
        validate={(values) => {
          let errors = {};

          // Validación nombre
          if (!values.name) {
            errors.name = 'Ingresa la Carrera';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,55}$/.test(values.name)) {
            errors.name = 'El nombre solo puede tener Letras y Espacios';
          }

          // Validación de la description
          if (!values.description) {
            errors.description = 'Ingresa una descripción';
          } else if (values.description.length > 300) {
            errors.description = 'La descripción no puede tener más de 40 caracteres';
          }

          // Validación de la department
          if (!values.department) {
            errors.department = 'Ingresa a qué departamento pertenece la carrera';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.department)) {
            errors.department = 'El departamento solo puede tener Letras y Espacios';
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
          axios.post(`${REACT_APP_API_URL}/carrer`, values)
            .then((response) => {
              console.log(response);
              
              if (response.status === 201) {
                Swal.fire({
                  title: "Carrera Agregada Correctamente",
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
                resetForm();
              } else if (response.status === 200) {
                Swal.fire({
                  title: `${response.data.message}`,
                  icon: 'warning',
                  confirmButtonText: 'Aceptar'
                });
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
        }}
      >
        {({ errors }) => (
          <Form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Agregar Carreras</h2>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Nombre de la Carrera: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="name"
                name="name"
                placeholder="Ej. Ingeniería Informática"
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
              <label htmlFor="department" className="leading-7 text-sm text-gray-600">Departamento: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                as="select"
                id="department"
                name="department"
                placeholder="Ej. Ingeniería"
              >
                  <option value="Economía y Administración'">Economía y Administración</option>
                  <option value="'Ciencias de la salud">Ciencias de la salud</option>
                  <option value="Ingenieria">Ingenieria</option>
                  <option value="Humanidades">Humanidades</option>
                  <option value="'Ciencias Juridicas, Politicas y sociales">'Ciencias Juridicas, Politicas y sociales</option>
              </Field>
              <ErrorMessage name="department" component={() => (<div className="error">{errors.department}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="duration" className="leading-7 text-sm text-gray-600">Duración: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="number"
                id="duration"
                name="duration"
                placeholder="Cantidad de años"
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
