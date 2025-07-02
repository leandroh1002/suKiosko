import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ButtonDefault from './ButtonDefault';
import axios from 'axios';
import UploadWidget from './UploadWidget';
import ButtonBack from './ButtonBack';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import PATHROUTES from '../helpers/PathRoutes.helper';


const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

function FormAddCompanies() {

  return (
    <>
      <Link to={PATHROUTES.GESTIONAR}><button className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Volver</button></Link>
      <Formik
        initialValues={{
          producto: '',
          marca: '',
          description: '',
          vencimiento: '',
          barra: '',
          compra: '',
          venta: '',
        }}
        validate={(values) => {
          let errors = {};

          // Validación producto
          if (!values.producto) {
            errors.producto = 'Ingresa el Producto';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.producto)) {
            errors.producto = 'El nombre solo puede tener Letras y Espacios';
          }

          // Validación de la imagen (URL)
          if (!values.marca) {
            errors.marca = 'Ingresa la marca';
          } else if (!/^https?:\/\/\S+$/.test(values.marca)) {
            errors.marca = 'Ingresa una URL válida';
          }

          // Validación de la description
          if (!values.description) {
            errors.description = 'Ingresa una descripción';
          } else if (values.description.length > 40) {
            errors.description = 'La descripción no puede tener más de 40 caracteres';
          }

          // Validación de la duration
          if (!values.vencimiento) {
            errors.vencimiento = 'Aquí va el vencimiento del producto';
          } else if (!/^\d+$/.test(values.vencimiento)) {
            errors.vencimiento = 'Solo números';
          }
          // Validación de la duration
          if (!values.barra) {
            errors.barra = 'Aquí va el codigo de barra';
          } else if (!/^\d+$/.test(values.barra)) {
            errors.barra = 'Solo números';
          }
          // Validación de la duration
          if (!values.duration) {
            errors.duration = 'Aquí va la duración de la carrera';
          } else if (!/^\d+$/.test(values.duration)) {
            errors.duration = 'Solo números';
          }
          // Validación de la duration
          if (!values.compra) {
            errors.compra = 'Aquí va el valor de compra';
          } else if (!/^\d+$/.test(values.compra)) {
            errors.compra = 'Solo números';
          }
          // Validación de la duration
          if (!values.venta) {
            errors.venta = 'Aquí va el valor de venta';
          } else if (!/^\d+$/.test(values.venta)) {
            errors.venta = 'Solo números';
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
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Agregar Productos</h2>
            <div className="relative mb-4">
              <label htmlFor="producto" className="leading-7 text-sm text-gray-600">Producto: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="producto"
                name="producto"
                placeholder="Ej. Gaseosa"
              />
              <ErrorMessage name="producto" component={() => (<div className="error">{errors.producto}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="marca" className="leading-7 text-sm text-gray-600">Marca: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="marca"
                name="marca"
                placeholder="Pepsi"
              />
              <ErrorMessage name="marca" component={() => (<div className="error">{errors.marca}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="description" className="leading-7 text-sm text-gray-600">descripción: </label>
              {/* <UploadWidget
                setPublicId={(imageUrl) => setFieldValue('image', imageUrl)} // Actualizamos el valor del campo 'image' en Formik
              /> */}
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="description"
                name="description"
                placeholder="2L retornable"
              />
              <ErrorMessage name="description" component={() => (<div className="error">{errors.description}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="vencimiento" className="leading-7 text-sm text-gray-600">fecha de vencimiento: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="number"
                id="vencimiento"
                name="vencimiento"
                placeholder="Fecha: 17-10-2023"
              />
              <ErrorMessage name="vencimiento" component={() => (<div className="error">{errors.vencimiento}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="barra" className="leading-7 text-sm text-gray-600">código de barra: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="number"
                id="barra"
                name="barra"
                placeholder="Ej. 1234567890123"
              />
              <ErrorMessage name="barra" component={() => (<div className="error">{errors.barra}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="compra" className="leading-7 text-sm text-gray-600">precio de compra: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="number"
                id="compra"
                name="compra"
                placeholder="Ej: $1000"
              />
              <ErrorMessage name="compra" component={() => (<div className="error">{errors.compra}</div>)} />
            </div>
            <div className="relative mb-4">
              <label htmlFor="venta" className="leading-7 text-sm text-gray-600">precio de venta: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="number"
                id="venta"
                name="venta"
                placeholder="Ej: $1000"
              />
              <ErrorMessage name="venta" component={() => (<div className="error">{errors.venta}</div>)} />
            </div>
            <ButtonDefault type="submit" props="Enviar"></ButtonDefault>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormAddCompanies;
