import React from 'react'

function Testimonials() {
  return (
    <section className="body-font rounded-tl-[200px] rounded-br-[200px] bg-[#c2d8ff] ">
    <div className="container px-5 py-24 mx-auto">
      <div className='mb-20'>
      <h5 className='mb-3'>Testimonios de nuestros alumnos.</h5>
      <p className='w-[687px] m-auto'>Descubre cómo nuestras pasantías han transformado las carreras de nuestros participantes. Estas historias reflejan el impacto real y las experiencias inolvidables que han vivido junto a nosotros.</p>
      </div>
      <div className="flex flex-wrap -m-4">
        <div id='cardTestimonial' className="lg:w-1/3 lg:mb-0 mb-6 p-4">
          <div className="h-full text-left">
          <div className='flex '>
          <img id='imageTestimonial' alt="Tania Andrew"
            src="https://res.cloudinary.com/dn3kedyer/image/upload/v1708397708/image/okp6zdfwvb8gklu8zga4.webp"
            className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center" />
            <div className='flex flex-col justify-center p-4'>
              <h2 className=" font-medium title-font tracking-wider text-sm">MARIA IBAÑES</h2>
              <p className="">Recursos Humanos</p></div>
            </div>
            <span className="inline-block h-1 w-10 rounded bg-[#246bd6] mt-6 mb-4"></span>
            <p className="leading-relaxed">Mi pasantía fue una excelente oportunidad para aplicar los conocimientos teóricos en la gestión de personal y procesos de selección. Pude entender mejor cómo funciona la dinámica en una empresa real, desarrollando habilidades para mi futura carrera.</p>
          </div>
        </div>
        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
          <div className="h-full text-left">
          <div className='flex '>
            <img alt="Tania Andrew"
            src="https://res.cloudinary.com/dn3kedyer/image/upload/v1708743165/image/riyytmqc4cbci03rp1vi.png"
            className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center" />
            <div className='flex flex-col justify-center p-4'>
            <h2 className=" font-medium title-font tracking-wider text-sm">JUAN MALCHIODI</h2>
            <p className="">Contador</p></div>
            </div>
            <span className="inline-block h-1 w-10 rounded bg-[#246bd6] mt-6 mb-4"></span>
            <p className="leading-relaxed">Durante mi pasantía tuve la oportunidad de trabajar en áreas de contabilidad financiera y auditoría. Aprendí a manejar sistemas contables y a analizar estados financieros, lo cual me dio una perspectiva práctica que complementa lo aprendido en clase.</p>
          </div>
        </div>
        <div className="lg:w-1/3 lg:mb-0 p-4">
          <div className="h-full text-left">
            <div className='flex '>
          <img alt="Tania Andrew"
            src="https://res.cloudinary.com/dn3kedyer/image/upload/v1708854726/image/ji1yot328zym8putbq5p.png"
            
            className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center" />
            <div className='flex flex-col justify-center p-4'>

            <h2 className=" font-medium title-font tracking-wider text-sm">LUCIA RODRIGUEZ</h2>
            <p className="">Ingeniería Industrial</p>
            </div>
            </div>
            <span className="inline-block h-1 w-10 rounded bg-[#246bd6] mt-6 mb-4"></span>
            <p className="leading-relaxed">Mi experiencia en la pasantía me permitió involucrarme en la optimización de procesos productivos. Pude aplicar metodologías de mejora continua y trabajar en equipo, enfrentando retos reales de una planta industrial.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Testimonials