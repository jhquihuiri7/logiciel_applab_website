"use client"
import React, { FunctionComponent, useState, useEffect } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";

const handleClick = () => {
    const url = "https://wa.me/593997613568?text=Hola%2C%20estoy%20interesado%20en%20desarrollar%20mi%20p%C3%A1gina%20web%20con%20ustedes.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%3F";
    window.open(url, "_blank"); // Opens the link in a new tab
    console.log("Navigating to WhatsApp link");
  };

const Nosotros:FunctionComponent = () => {
    const [isLandscape, setIsLandscape] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false); // Nuevo estado para identificar si es móvil

    useEffect(() => {
        if (typeof window !== "undefined") {
            const checkIfMobile = window.innerWidth <= 900; // Definir un límite para dispositivos móviles
            setIsMobile(checkIfMobile); // Actualizar el estado según el tamaño de la ventana

            setIsLandscape(window.innerWidth > window.innerHeight);
            
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 900); // Verificar en cada redimensionado si es móvil
                setIsLandscape(window.innerWidth > window.innerHeight);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    if (isLandscape === null) return null;
      
    return (
        <div id="nosotros-component" className={`bg-white w-full text-sm flex justify-center items-center ${(isMobile && isLandscape) ? "h-fit flex-col" : "h-fit sm:h-screen flex-col sm:flex-row"}`}>
            <div className={`${(isMobile && isLandscape) ? "w-full" : "sm:w-1/2 w-full"} px-0 sm:px-16 flex flex-col justify-center items-center`}>
                <div className="sm:text-[49px] text-[30px] py-3 px-8 leading-[108.16%] font-semibold text-black">Liderando la nueva era de la transformación digital</div>
            	<div className='w-full flex flex-row flex-wrap py-10 text-black'>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Personaliza tu página</h2>
                        <p className='text-[#616264]'>Crea con nosotros una página web personalizada para tu empresa o responde unas preguntas y recibe un diseño gratuito adaptado a tus necesidades.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Accesibilidad Garantizada</h2>
                        <p className='text-[#616264]'>Integrando herramientas avanzadas de accesibilidad para garantizar una experiencia óptima para todos tus usuarios.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Optimiza para móviles</h2>
                        <p className='text-[#616264]'>Asegúrate de que tu página se vea perfecta en dispositivos móviles, y personaliza la versión móvil para una experiencia óptima, adaptada a los visitantes locales e internacionales.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Optimiza para SEO</h2>
                        <p className='text-[#616264]'>Potencia tu tráfico orgánico y mejora la visibilidad de tu negocio en las búsquedas con nuestras avanzadas herramientas de SEO, destaca en el competitivo.</p>
                    </div>
                </div>
            </div>
            <div className="sm:w-1/2 bg-[#f4f4f4] w-full h-full py-5 sm:py-0 bg-contain flex flex-col justify-center items-center">
				<img src='https://res.cloudinary.com/logicielapplab/image/upload/v1739149242/LOGICIEL_APPLAB_2025/Nosotros/nosotros_ajpsl5.webp' className='h-1/3 sm:h-2/3' alt=''/>
                <ShinyButton className='mt-14 bg-[#000000]' onClick={handleClick}><p className='text-white'>Empezar ahora</p></ShinyButton>
			</div>
      	</div>
    );
}
export default Nosotros;