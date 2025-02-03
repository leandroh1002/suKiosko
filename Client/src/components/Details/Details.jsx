import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonApply from '../ButtonApply';
import ButtonBack from '../ButtonBack';
import styles from './Details.module.sass';
import { useSelector } from 'react-redux';

function Details({ valueId }) {
    const [countries, setCountries] = useState({});
    const [localSomePublishes, setLocalSomePublishes] = useState([]);
    const { id } = useParams();
    const globalSomePublishes = useSelector((state) => state.somePublish);

    
    useEffect(() => {
        axios(`/publish/${id}`).then(({ data }) => {
            if (data.idPublish) {
                setCountries(data);
            } else {
                window.alert('No hay publicaciones con ese ID');
            }
        });
        return () => setCountries({});
    }, [id]);
    
    
    useEffect(() => {
        setLocalSomePublishes(globalSomePublishes);
    }, [globalSomePublishes]);
    
    const isApplied = localSomePublishes.includes(id);
    const handleApplySuccess = () => {
        setLocalSomePublishes([...localSomePublishes, id]);
    };
    return (
        <div className={styles.container}>
            <div className="flex items-center">
                <div className={styles.presentacion}>
                    {countries.Companies && countries.Companies.length > 0 && (
                        <img
                            className="w-[200px] h-[132px] rounded-md ml-4 mr-4"
                            src={countries.Companies[0].image}
                            alt={countries.Companies[0].name}
                        />
                    )}
                    <div>
                        <h3>Unite al equipo de {countries.Companies && countries.Companies.length > 0 && countries.Companies[0].name}</h3>
                        <h4>{countries.namePublish}</h4>
                    </div>
                </div>

                {isApplied ? (
                    <ButtonApply type="button" props="Ya estás postulado" disabled={true} />
                ) : (
                    <ButtonApply 
                        type="button" 
                        props="Postularse" 
                        idPublish={countries.idPublish} 
                        value={valueId} 
                        onSuccess={handleApplySuccess}  // Pasar la función de éxito
                    />
                )}
            </div>
            <div className={styles.content}>
                <hr />
                <p>{countries.description}</p>
                <h4>Algunas tareas a realizar:</h4>
                <p>{countries.task}</p>
                <h4>Ofrecemos</h4>
                <p>{countries.offer}</p>
                <h4>Requisitos:</h4>
                <p>{countries.requirement}</p>
                <h4>Lugar:</h4>
                <p>{countries.location}</p>
            </div>
            <ButtonBack type="button" props="Volver" />
        </div>
    );
}

export default Details;
