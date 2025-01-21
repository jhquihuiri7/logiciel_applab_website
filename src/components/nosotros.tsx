"use client"
import React, { FunctionComponent } from 'react';
import { ShinyButton } from "@/components/ui/shiny-button";

const handleClick = () => {
    const url = "https://wa.me/593997613568?text=Quiero%20saber%20m%C3%A1s%20de%20p%C3%A1ginas%20web.";
    window.open(url, "_blank"); // Opens the link in a new tab
    console.log("Navigating to WhatsApp link");
  };

const Nosotros:FunctionComponent = () => {
      
    return (
        <div id="nosotros-component" className="bg-white w-full h-fit sm:h-screen text-sm flex sm:flex-row flex-col justify-center items-center">
            <div className="sm:w-1/2 w-full px-0 sm:px-16 flex flex-col justify-center items-center">
                <div className="sm:text-[49px] text-[30px] py-3 px-8 leading-[108.16%] font-semibold text-black"style={{fontFamily: 'Outfit',WebkitLineClamp: 3,WebkitBoxOrient: 'vertical',}}>Liderando la nueva era de la transformación digital</div>
            	<div className='w-full flex flex-row flex-wrap py-10 text-black'>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Personaliza tu página</h2>
                        <p>Crea con nosotros una página web personalizada para tu empresa o responde unas preguntas y recibe un diseño gratuito adaptado a tus necesidades.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Accesibilidad Garantizada</h2>
                        <p>Integrando herramientas avanzadas de accesibilidad para garantizar una experiencia óptima para todos tus usuarios.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Optimiza para móviles</h2>
                        <p>Asegúrate de que tu página se vea perfecta en dispositivos móviles, y personaliza la versión móvil para una experiencia óptima, adaptada a los visitantes locales e internacionales.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Optimiza para SEO</h2>
                        <p>Potencia tu tráfico orgánico y mejora la visibilidad de tu negocio en las búsquedas con nuestras avanzadas herramientas de SEO, destaca en el competitivo.</p>
                    </div>
                </div>
            </div>
            <div className="sm:w-1/2 bg-[#f4f4f4] w-full h-full py-5 sm:py-0 bg-contain flex flex-col justify-center items-center">
				<img src='/images/nosotros.png' className='h-1/3 sm:h-2/3'></img>
                <ShinyButton className='mt-14 bg-[#000000]' onClick={handleClick}><p className='text-white'>Empezar ahora</p></ShinyButton>
			</div>
      	</div>
    );
}
export default Nosotros;