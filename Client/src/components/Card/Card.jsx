import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { getSomePublish } from "../../redux/actions/index";
import ButtonDefault from '../ButtonDefault';
import PATHROUTES from "../../helpers/PathRoutes.helper";
import ButtonApply from '../ButtonApply';
import style from "./Card.module.sass";
import { useDispatch, useSelector } from 'react-redux';

function Card({ idPublish, namePublish, carrer, enterprise, image, Companies, task, otherDescription, perfilDecription, value }) {
  const uriparam = useLocation();
  const imagem = Companies[0].image;
  const dispatch = useDispatch();
  const [localSomePublishes, setLocalSomePublishes] = useState([]);
  const globalSomePublishes = useSelector((state) => state.somePublish);
  const idPeople = JSON.parse(localStorage.getItem("idPeople"));

  useEffect(() => {
    dispatch(getSomePublish(idPeople));
  }, [dispatch, idPeople]);

  useEffect(() => {
    setLocalSomePublishes(globalSomePublishes);
  }, [globalSomePublishes]);

  console.log(globalSomePublishes);
  

  const isAlreadyApplied = localSomePublishes.includes(idPublish);
  console.log(isAlreadyApplied);
  

  const handleApplySuccess = () => {
    setLocalSomePublishes([...localSomePublishes, idPublish]);
  };

  return (
    <div className={style.container}>
      <Link to={`/detail/${idPublish}`}>
        <div className={style.imagenes}>
          <img className={style.logo} src={imagem} alt="" />
        </div>
      </Link>
      <div className={style.contenido}>
        <h4 className={style.font}>{namePublish}</h4>
        
        {uriparam.pathname === PATHROUTES.HOME ? (
          isAlreadyApplied ? (
            <ButtonDefault type='button' props="Ya estás postulado" disabled={true} />
          ) : (
            <ButtonApply 
              type='button' 
              props="Postularse" 
              idPublish={idPublish} 
              value={value} 
              onSuccess={handleApplySuccess} 
            />
          )
        ) : (
          <Link to={PATHROUTES.LOGIN}>
            <ButtonDefault type='button' props="Iniciar sesión" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
