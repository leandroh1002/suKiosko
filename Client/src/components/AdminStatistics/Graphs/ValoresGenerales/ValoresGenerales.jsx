import { useState, useEffect } from "react";
import style from "./ValoresGenerales.module.sass"; // Asegúrate de importar el archivo de estilos
import Swal from "sweetalert2";


function Calification() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState([]);

  const successfulConnections = Math.ceil(Number((statistics.cantidadOportunidades) - Number(statistics.cantidadContrataciones)) / Number(statistics.cantidadOportunidades * 100));
const customersByProvider = Math.ceil(Number(statistics.cantidadProveedores) / Number(statistics.cantidadClientes));

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/graficos`);
        const data = await response.json();
        const indicadoresPersonales = data
        setStatistics(indicadoresPersonales);
      } 
      catch (error) 
      {
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
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.cantidadProductos}</p>
        <p className={style.statisticsDescription}>Variedad de productos</p>
        </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>${statistics.gananciasTotales}</p>
        <p className={style.statisticsDescription}>Ganancias totales</p>
        </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.ventasTotales}</p>
        <p className={style.statisticsDescription}>Ventas totales</p>
        </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.cantidadTransferencias}</p>
        <p className={style.statisticsDescription}>Cantidad de transferencias</p>
      </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.productoMasVendido}</p>
        <p className={style.statisticsDescription}>Producto mas vendido</p>
      </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.variacionSemanal}</p>
        <p className={style.statisticsDescription}>Variacion semanal</p>
      </div>
    </div>
  );
}


export default Calification;