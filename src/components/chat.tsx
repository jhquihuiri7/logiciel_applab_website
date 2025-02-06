"use client"
import React, { FunctionComponent, useState, useEffect } from "react";

const url =
  "https://wa.me/593997613568?text=Hola%2C%20estoy%20interesado%20en%20desarrollar%20mi%20p%C3%A1gina%20web%20con%20ustedes.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%3F";

const Chat: FunctionComponent = () => {
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
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div
        className={`fixed shadow-xl bg-white w-7 h-32 ${
          (isMobile && isLandscape) ? "top-32" : "top-80"
        }`}
      >
        <p className="text-lg text-center rotate-90 pl-4">
          Escríbenos
        </p>
      </div>
    </a>
  );
};

export default Chat;
