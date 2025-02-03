import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PATHROUTES from "../helpers/PathRoutes.helper";
import StoreItem from "../helpers/LocalStorage";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ButtonDefault from './ButtonDefault';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarrer } from '../redux/actions';
import Swal from "sweetalert2";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;


function Signin() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const allCarrers = useSelector((state) => state.allCarrer);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllCarrer());
  }, [dispatch]);
  console.log(allCarrers)


  return (
    <div><section className="text-gray-600 body-font bg-[#e7f6ff]">
    <div className="container px-5 py-20 mx-auto flex flex-wrap items-center">
      <div className="ALFA lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 className="title-font font-medium text-3xl text-gray-900">Únete a Nosotros</h1>
        <p className="leading-relaxed mt-4">Regístrate para acceder a oportunidades exclusivas de pasantías, recibir actualizaciones y conectarte con profesionales de la industria. Empieza tu viaje profesional con nosotros.</p>
      </div>
      <Formik
      initialValues={{
        email: '',
        password: '',
        fullName: '',
        yearsOfCarrer: '',
        idCarrer: '',
      }}
      validate={(values) => {
        let errors = {};

        // Validación email
        if (!values.email) {
          errors.email = 'Ingresa un email';
        } else if (values.password.length > 40) {
          errors.email = 'El nombre solo puede tener Letras y Espacios';
        }

        // Validación de la password
        if (!values.password) {
          errors.password = 'Ingresa una contraseña';
        } else if (values.password.length > 40) {
          errors.password = 'La descripción no puede tener más de 40 caracteres';
        }

        // Validación de la fullName
        if (!values.fullName) {
          errors.fullName = 'Ingresa tu Nombre completo';
        } else if (values.fullName.length > 40) {
          errors.fullName = 'La descripción no puede tener más de 40 caracteres';
        }
        
        // Validación de yearsOfCarrer
        if (!values.yearsOfCarrer) {
          errors.yearsOfCarrer = 'Ingresa el año que estas cursando';
        } else if (values.yearsOfCarrer.length > 40) {
          errors.yearsOfCarrer = 'La descripción no puede tener más de 40 caracteres';
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        console.log("valores de carreras", values.idCarrer)
        axios.post(`${REACT_APP_API_URL}/signin`, values)
          .then((response) => {
            if (response.status === 201 || response.status === 200) {
              const token = response.data.token;
              console.log(rememberMe, "remenberMe");
              console.log("Token recibido del servidor:", token);
              localStorage.setItem("token", token);
              if (rememberMe) {
                const fullName = response.data.fullName;
                const passwordUser = response.data.password;
                const email = response.data.email;
                console.log(
                  "Email y password recibida del servidor:",
                  email,
                  passwordUser
                );
                localStorage.setItem(StoreItem.passwordUser, JSON.stringify(passwordUser));
                localStorage.setItem(StoreItem.email, JSON.stringify(email));
                localStorage.setItem(StoreItem.fullName, JSON.stringify(fullName));
              }
              Swal.fire({
                title: "Registrado Correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              navigate(PATHROUTES.LOGIN);
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
      }}
      >
        {({ errors }) => (
      <Form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
        <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="email"
                name="email"
                placeholder="Ej: tunombre@mail.com"
              />
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
              <label htmlFor="fullName" className="leading-7 text-sm text-gray-600">Nombre y Apellido: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Ej: Jose Perez"
              />
              <ErrorMessage name="fullName" component={() => (<div className="error">{errors.fullName}</div>)} />
            </div>
            <div className="relative mb-4">
              <label htmlFor="yearsOfCarrer" className="leading-7 text-sm text-gray-600">Año que cursas: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="yearsOfCarrer"
                name="yearsOfCarrer"
                placeholder="Ej: 3"
              />
              <ErrorMessage name="yearsOfCarrer" component={() => (<div className="error">{errors.yearsOfCarrer}</div>)} />
            </div>
            <div className='relative mb-4'>
                <Field name='idCarrer' as='select' className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    <option value="">Elige una carrera</option>
                    {allCarrers && allCarrers.map(carrer => (
                                <option key={carrer.idCarrer} value={carrer.idCarrer}>{carrer.name}</option>
                            ))}
                    </Field>
                </div>
            <ButtonDefault type="submit" props="Registrarse"></ButtonDefault>
        <p className="text-xs text-gray-500 mt-3">Tu cuenta en autogestion debe estar accesible.</p>
        </Form>)}
      </Formik>
    </div>
  </section></div>
  )
}

export default Signin