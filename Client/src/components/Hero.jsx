import React from 'react';
import ButtonDefault from "./ButtonDefault";
import styles from "../components/styles/Hero.module.sass";
import imagenportada from "../assets/LandingImages/BusinessStrategy.png";
import { motion } from "framer-motion";

function Hero({ onScrollToSection }) {  // Recibe la función por props
  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondaryContainer}>
        <div className={styles.containerLeft}>
          <h1>¡Explora Nuestras Pasantías!</h1>
          <h4 className={styles.parrafo}>Desarrolla tus habilidades y gana experiencia en un entorno profesional.</h4>
          <p>En nuestro programa de pasantías, tendrás la oportunidad de trabajar con expertos en la industria, participar en proyectos reales y expandir tu red profesional. ¡No pierdas la oportunidad de dar el primer paso hacia tu carrera soñada!</p>
          <button onClick={onScrollToSection}> {/* Llama a la función al hacer clic */}
            <ButtonDefault type='button' props="¡Aplica Ahora!"/>
          </button>
        </div>
        {/* <div className={styles.containerRight}>
          <img id='imageHero' className="object-cover object-center rounded w-[590px] h-[590px]" alt="hero" src={imagenportada}/>
        </div> */}
      </div>
    </div>
  );
}

export default Hero;
