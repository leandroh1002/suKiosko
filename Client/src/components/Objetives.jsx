import React from 'react';
import { motion } from 'framer-motion'; // Importa Framer Motion
import imagenobjetives from "../assets/LandingImages/Taskmanagement.png";
import compass from "../assets/LandingImages/compass.svg";
import tools from "../assets/LandingImages/tools.svg";
import targetarrow from "../assets/LandingImages/target-arrow.svg";
import charthistogram from "../assets/LandingImages/chart-histogram.svg";

function Objetives() {

  // Configuración de la animación
  const textVariants = {
    hidden: { opacity: 0, x: 100 },  // Comienza desplazado hacia la derecha
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },  // Se desplaza suavemente a la posición inicial
  };

  return (
    <div id='objetivos' className='flex min-h-[647px] items-center content-center'>
      <div className=''>
        <img id='imageObjetivos' className='w-[550px] h-[550px]' src={imagenobjetives} alt="" />
      </div>

      <div className='text-left w-[710px]'>
        <div className='flex'>
          <img id='herramientas' className='w-[33px] h-[33px]' src={tools} alt="" />
          <motion.div
            className='pl-5 pb-6'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}  // Solo animar una vez cuando esté al menos 20% visible
            variants={textVariants}
          >
            <h4>Experiencia Real en la Industria</h4>
            <p>Trabaja en proyectos reales y adquiere experiencia práctica que te preparará para el mundo laboral.</p>
          </motion.div>
        </div>

        <div className='flex'>
          <img id='compass' className='w-[33px] h-[33px]' src={compass} alt="" />
          <motion.div
            className='pl-5 pb-6'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} 
            variants={textVariants}
          >
            <h4>Mentoría Personalizada</h4>
            <p>Aprende de expertos de la industria que te guiarán y apoyarán durante toda tu pasantía</p>
          </motion.div>
        </div>

        <div className='flex'>
          <img id='arrow' className='w-[33px] h-[33px]' src={targetarrow} alt="" />
          <motion.div
            className='pl-5 pb-6'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} 
            variants={textVariants}
          >
            <h4>Desarrollo de Habilidades Clave</h4>
            <p>Mejora tus habilidades técnicas y blandas a través de experiencias prácticas y desafíos que te preparan para el éxito profesional</p>
          </motion.div>
        </div>

        <div className='flex'>
          <img id='diagrama' className='w-[33px] h-[33px]' src={charthistogram} alt="" />
          <motion.div
            className='pl-5 pb-6'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} 
            variants={textVariants}
          >
            <h4>Oportunidades de Crecimiento</h4>
            <p>Accede a oportunidades exclusivas de desarrollo profesional y crecimiento dentro de la empresa</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Objetives;
