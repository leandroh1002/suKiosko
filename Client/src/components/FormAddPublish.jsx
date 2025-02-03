import React, { useEffect, useState } from 'react'
import { Formik , Form, Field, ErrorMessage } from 'formik'
import ButtonDefault from "./ButtonDefault"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies, getAllCarrer } from "../redux/actions/index";
import ButtonBack from './ButtonBack';
import Swal from "sweetalert2";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

function FormAddPublish() {
  const allCarrers = useSelector((state) => state.allCarrer);
  const allCompanies = useSelector((state) => state.allCompanies);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllCarrer());
      dispatch(getAllCompanies());
  }, [dispatch]);
  
  return (
    <>
      <ButtonBack type="button" props="Volver"/>
      <Formik
            initialValues={{
                namePublish: '',
                description: '',
                task: '',
                perfil: '',
                requirement: '',
                offer: '',
                location: '',
                idCarrer: '',
                idCompany: ''
            }}
        validate={(values) => {
          let errors = {};

          // Validación namePublish
          if (!values.namePublish) {
            errors.namePublish = 'Ingresa la Carrera';
          } else if (!/^[a-zA-ZÀ-ÿ\s.,]{1,500}$/.test(values.namePublish)) {
            errors.namePublish = 'El nombre solo puede tener Letras y Espacios';
          }

          // Validación de la description
          if (!values.description) {
            errors.description = 'Ingresa una descripción de la busqueda';
          } else if (values.description.length > 3000) {
            errors.description = 'La descripción no puede tener más de 3000 caracteres';
          }

          // Validación de tareas
          if (!values.task) {
            errors.task = 'Ingresa qué tareas van a desempeñar';
          } else if (!/^[a-zA-ZÀ-ÿ\s.,;:!?()\-\t•]{1,3000}$/.test(values.task)) {
            errors.task = 'Las tareas solo pueden tener letras, espacios, puntuación común y viñetas';
          }

          // Validación de la perfil
          if (!values.perfil) {
            errors.perfil = 'Ingresa el perfil que buscan';
          } else if (!/^[a-zA-ZÀ-ÿ\s.,;:!?()\-\t•]{1,3000}$/.test(values.perfil)) {
            errors.perfil = 'Solo números';
          }
          // Validación de la requirement
          if (!values.requirement) {
            errors.requirement = 'Ingrese los requerimientos mínimos de la postulación';
          } else if (!/^[a-zA-ZÀ-ÿ/\s.,;:!?()\-\t•]{1,3000}$/.test(values.requirement)) {
            errors.requirement = 'Los requisitos no puede tener más de 3000 caracteres';
          }

          // Validación de la offer
          if (!values.offer) {
            errors.offer = 'Ingresa que ofrecen en este puesto';
          } else if (values.offer.length > 3000) {
            errors.offer = 'Los requisitos no puede tener más de 3000 caracteres';
          }

          // Validación de la location
          if (!values.location) {
            errors.location = 'Ingresa a que localidad esta dirigida la postulación';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.location)) {
            errors.location = 'Solo números';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          axios.post(`${REACT_APP_API_URL}/publish`, values)
            .then((response) => {
              if (response.status === 201 || response.status === 200) {
                Swal.fire({
                  title: "Publicacion Agregada Correctamente",
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
        }
    }
      >
        {({ errors }) => (
          <Form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Agregar Publicaciones</h2>
            
            <div className="relative mb-4">
              <label htmlFor="namePublish" className="leading-7 text-sm text-gray-600">Nombre de la publicación: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="namePublish"
                name="namePublish"
                placeholder="Ingresa el título de la pasantía o el nombre de la posición..."
              />
              <ErrorMessage name="namePublish" component={() => (<div className="error">{errors.namePublish}</div>)} />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="description" className="leading-7 text-sm text-gray-600">Descripçión de la pasantía: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="description"
                id="description"
                as="textarea"
                name="description"
                placeholder="Describe brevemente en qué consiste la pasantía..."
              />
              <ErrorMessage name="description" component={() => (<div className="error">{errors.description}</div>)} />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="task" className="leading-7 text-sm text-gray-600">Tareas: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="task"
                as="textarea"
                name="task"
                placeholder="Detalla las principales responsabilidades y tareas que realizará el pasante..."
              />
              <ErrorMessage name="task" component={() => (<div className="error">{errors.task}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="perfil" className="leading-7 text-sm text-gray-600">Perfil: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                as="textarea"
                id="perfil"
                name="perfil"
                placeholder="Indica el perfil ideal del candidato (habilidades, estudios, experiencia)..."
              />
              <ErrorMessage name="perfil" component={() => (<div className="error">{errors.perfil}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="requirement" className="leading-7 text-sm text-gray-600">Requisitos: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="requirement"
                name="requirement"
                as="textarea"
                placeholder="Lista los requisitos mínimos que debe cumplir el postulante..."
              />
              <ErrorMessage name="requirement" component={() => (<div className="error">{errors.requirement}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="offer" className="leading-7 text-sm text-gray-600">Ofrecemos: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                as="textarea"
                id="offer"
                name="offer"
                placeholder="Describe los beneficios y oportunidades que se ofrecen al pasante..."
              />
              <ErrorMessage name="offer" component={() => (<div className="error">{errors.offer}</div>)} />
            </div>

            <div className="relative mb-4">
              <label htmlFor="duration" className="leading-7 text-sm text-gray-600">Localidad: </label>
              <Field
                className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                id="location"
                name="location"
                placeholder="Especifica la ubicación física de la pasantía o si es remota..."
              />
              <ErrorMessage name="location" component={() => (<div className="error">{errors.location}</div>)} />
            </div>

            <div className='relative mb-4'>
                <Field name='idCarrer' as='select' className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    <option value="">Elige una carrera</option>
                    {allCarrers && allCarrers.map(carrer => (
                                <option key={carrer.idCarrer} value={carrer.idCarrer}>{carrer.name}</option>
                            ))}
                    </Field>
                </div>

                <div className='relative mb-4'>
                <Field name='idCompany' as='select' className="w-full bg-white rounded border border-gray-300 focus:border-[#ca7d10] focus:ring-2 focus:ring-[#d9b662] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    <option value="">Elige una empresa</option>
                    {allCompanies && allCompanies.map(carrer => (
                                <option key={carrer.idCompanies} value={carrer.idCompanies}>{carrer.name}</option>
                            ))}
                    </Field>
                </div>
                
            <ButtonDefault type="submit" props="Enviar"></ButtonDefault>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormAddPublish;
