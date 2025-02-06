"use client"
import React, { FunctionComponent, useState, useEffect } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Trading 8",
    username: "@jane",
    img: "/images/trading8.png",
  },
  {
    name: "Earthquake",
    username: "Earthquake dashboard",
    img: "/images/earthquakes.png",
  },
  {
    name: "Trading 8",
    username: "@james",
    img: "/images/trading8.png",
  },
];

const ReviewCard = ({
  name,
  img,
}: {
  name: string;
  img: string;
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="relative w-full sm:w-[500px] cursor-pointer overflow-hidden rounded-xl border"
    >
      <img src={img} alt={name} className="w-full h-full object-cover" />
      {/* Texto centrado sobre la imagen */}
      <div className="absolute inset-0 flex items-end justify-center mb-10">
        <ShinyButton className='bg-slate-50 w-full'>
          <span className='font-bold'>{name}</span>
        </ShinyButton>
      </div>
    </div>
  );
};
const Clients:FunctionComponent = () => {
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
    <div  id="clients-component"  className={`relative flex w-full ${(isMobile && isLandscape) ? "h-[800px]" : "h-[800px] sm:h-screen"} py-10 sm:py-0 bg-[#292e70] flex-col items-center justify-center overflow-hidden md:shadow-xl`}>
      <div className='px-5 sm:px-[25%] w-full flex flex-col justify-center items-center'>
        <h3 className='font-bold text-4xl text-white text-center sm:text-[49px] text-[30px]'>Páginas web diseñadas para crecer sin límites</h3>
        <span className='text-xl mt-6 text-white'>¿Buscas inspiración?</span><br></br>
        <span className='text-xl mb-6 text-white'>Descubre esta colección de sitios web creados por usuarios de Logiciel AppLab como tú.</span>
      </div>
      <Marquee pauseOnHover className="[--duration:20s] hidden sm:flex">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical reverse className="[--duration:20s] flex sm:hidden">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}


export default Clients;

