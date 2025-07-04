import { useState, useEffect } from "react";
import style from "./MostSearch.module.sass";
import Swal from "sweetalert2";

function MostSearch() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/masvendidos?cantidad=10`);
        const data = await response.json();
        const serviciosMasBuscados = data;
        setStatistics(serviciosMasBuscados);
       
      } 
      catch (error) {
        // Swal.fire({
        //   title: 'Error',
        //   text: 'Error al obtener los servicios mas buscados.',
        //   icon: 'error',
        //   confirmButtonText: 'Aceptar'
        // });
      }
    };
    fetchEducation();
  }, []);
  console.log(statistics);
  

  return (
    <div className={style.statisticsContainer}>
      {statistics.slice(0, 6).map((item, index) => (
        <div key={index} className={style.statisticsItem}>
          <p className={style.statisticsValue}>{item.total_vendido}</p>
          <p className={style.statisticsText}>{item.Producto.nombre}</p>
        </div>
      ))}
    </div>
  );
}


export default MostSearch;