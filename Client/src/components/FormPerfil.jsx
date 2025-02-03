import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ButtonDefault from './ButtonDefault';
import axios from 'axios';
import UploadWidget from './UploadWidget';
import ButtonBack from './ButtonBack';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

function FormPerfil() {
  const userLoggedInfo = useSelector(state => state.UserLogued);

  return (
    <>
      <ButtonBack type="button" props="Volver"/>
      <Formik
        initialValues={{
          idPeople: userLoggedInfo.idPeople,
          fullName: userLoggedInfo.fullName,
          aboutMe: userLoggedInfo.aboutMe,
          email: userLoggedInfo.email,
          password: userLoggedInfo.password,
          phone: userLoggedInfo.phone,
          location: userLoggedInfo.location,
          country: userLoggedInfo.country,
          image: userLoggedInfo.image,
          cv: userLoggedInfo.cv,
          yearsOfCarrer: userLoggedInfo.yearsOfCarrer,
        }}
      
        validate={(values) => {
          let errors = {};

          // Validación nombre
          if (!values.fullName) {
            errors.fullName = 'Ingresa tu nombre completo';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.fullName)) {
            errors.fullName = 'El nombre solo puede tener Letras y Espacios';
          }

          // Validación de la AboutMe
          if (!values.aboutMe) {
            errors.aboutMe = 'Ingresa una descripción';
          } else if (values.aboutMe.length > 500) {
            errors.aboutMe = 'La descripción no puede tener más de 40 caracteres';
          }
          // Validación nombre
          if (!values.location) {
            errors.location = 'Ingresa tu Localidad';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.location)) {
            errors.location = 'El nombre solo puede tener Letras y Espacios';
          }

          // Validación de la AboutMe
          if (!values.country) {
            errors.country = 'Ingresa la provincia de donde eres';
          } else if (values.country.length > 500) {
            errors.country = 'La descripción no puede tener más de 40 caracteres';
          }

          // Validación de la imagen (URL)
          if (!values.image) {
            errors.image = 'Ingresa la URL de la imagen';
          } else if (!/^https?:\/\/\S+$/.test(values.image)) {
            errors.image = 'Ingresa una URL válida';
          }
          // Validación de la imagen (URL)
          if (!values.cv) {
            errors.cv = 'Ingresa la URL de la imagen';
          } else if (!/^https?:\/\/\S+$/.test(values.cv)) {
            errors.cv = 'Ingresa una URL válida';
          }
          // Validación de Email
          if (!values.email) {
            errors.email = 'Ingresa tu correo electrónico';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Ingresa un correo electrónico válido';
          }

          // Validación de password
          if (!values.password) {
            errors.password = 'Ingresa tu contraseña';
          } else if (values.password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
          }
          // Validación de la duration
          if (!values.yearsOfCarrer) {
            errors.yearsOfCarrer = 'Aquí va la duración de la carrera';
          } else if (!/^[1-5]$/.test(values.yearsOfCarrer)) {
            errors.yearsOfCarrer = 'En años del 1 al 5';
          }
          
          if (!values.phone) {
            errors.phone = 'Ingresa tu numero de contacto';
          } else if (!/^\d+$/.test(values.phone)) {
            errors.phone = 'Solo números';
          }
          return errors;
        }}
        onSubmit={(values) => {
          axios.put(`${REACT_APP_API_URL}/people`, values)
            .then((response) => {
              if (response.status === 201 || response.status === 200) {
                Swal.fire({
                  title: "Perfil Actualizado Correctamente",
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });              }
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

        {({ errors, setFieldValue, fieldValue }) => {
          useEffect(() => {

          }, []);

          return (
          <Form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Perfil</h2>
            <div className="relative mb-4">
              <label htmlFor="fullName" className="leading-7 text-sm text-gray-600">Nombre: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Ej. Juan Lopez"
                disabled
              />
              <ErrorMessage name="fullName" component={() => (<div className="error">{errors.fullName}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="aboutMe" className="leading-7 text-sm text-gray-600">Descripción: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="aboutMe"
                name="aboutMe"
                placeholder="Descripción"
              />
              <ErrorMessage name="aboutMe" component={() => (<div className="error">{errors.aboutMe}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Telefono de contacto: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="phone"
                name="phone"
                placeholder="Ej: 3811234567"
              />
              <ErrorMessage name="phone" component={() => (<div className="error">{errors.phone}</div>)} />
            </div>

            <div className="relative mb-4 flex gap-1 justify-center">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email: </label>
              <p>{userLoggedInfo.email}</p>
              {/* <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="email"
                name="email"
                placeholder="Ej: ejemplo@mail.com"
              /> */}
              <ErrorMessage name="email" component={() => (<div className="error">{errors.email}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component={() => (<div className="error">{errors.password}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="location" className="leading-7 text-sm text-gray-600">Localidad: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="location"
                name="location"
                placeholder="Localidad"
              />
              <ErrorMessage name="location" component={() => (<div className="error">{errors.location}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="country" className="leading-7 text-sm text-gray-600">Provincia: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="country"
                name="country"
                placeholder="Provincia"
              />
              <ErrorMessage name="country" component={() => (<div className="error">{errors.country}</div>)} />
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
              <label htmlFor="image" className="leading-7 text-sm text-gray-600">CV: </label>
              <UploadWidget
                setPublicId={(imageUrl) => setFieldValue('cv', imageUrl)} // Actualizamos el valor del campo 'image' en Formik
              /><div className='flex'>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="cv"
                name="cv"
                placeholder="CV"
              /><a href={userLoggedInfo.cv} target='_blank'><ButtonDefault type='button' props="Download CV"></ButtonDefault></a></div>
              <ErrorMessage name="cv" component={() => (<div className="error">{errors.cv}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="yearsOfCarrer" className="leading-7 text-sm text-gray-600">Duración: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="number"
                id="yearsOfCarrer"
                name="yearsOfCarrer"
                placeholder="Año que cursa"
              />
              <ErrorMessage name="yearsOfCarrer" component={() => (<div className="error">{errors.yearsOfCarrer}</div>)} />
            </div>
            <ButtonDefault type="submit" props="Enviar"></ButtonDefault>
          </Form>
        )}}
      </Formik>
    </>
  );
}

export default FormPerfil;
