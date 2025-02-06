"use client"
import React, { FunctionComponent, useState, useEffect } from "react";

const Card = ({
  img,
  title,
  description,
  hashtags,
  showNew
}: {
  img: string;
  title: string;
  description:string;
  hashtags:string[];
  showNew:boolean;
}) => {
    return (
      <div className="card bg-base-100 w-full sm:w-[40%] mb-4 shadow-xl">
        <figure>
          <img
            src={img}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            {showNew ? <div className="badge badge-secondary">NEW</div> : <div></div>}
          </h2>
          <p className='text-[#616264]'>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline font-bold">{hashtags[0]}</div>
            <div className="badge badge-outline font-bold">{hashtags[1]}</div>
          </div>
        </div>
      </div>
    );
  };


const Services:FunctionComponent = () => {
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
      <div id="services-component" className={`w-full ${(isMobile && isLandscape) ? "h-fit" : "h-fit sm:h-screen"} p-10 flex flex-col justify-center items-center bg-[#f6f4f5]`}>
        <h3 className='font-bold text-4xl'>Nuestros Servicios</h3>
        <div className='w-full my-5 flex flex-col sm:flex-row justify-around'>
          <Card 
            img="/images/servicios1.jpeg" 
            title='Diseño web a medida'
            hashtags={['#PaginasWeb','#TuNegocio']}
            showNew={false}
            description='Crea tu propia página con nosotros, con calidad profesional, ideal para promocionar tu negocio, exhibir tus proyectos o lanzar tu tienda online'>
          </Card>
          <Card 
            img='/images/servicios2.jpeg' 
            title='Optimización para motores de búsqueda'
            hashtags={['#SEO','#MarketingDigital']}
            showNew={true}
            description='Obtén funciones de SEO para aumentar la presencia de tu sitio en los principales resultados de búsqueda'>
          </Card>
        </div>
      </div>
  );
}

export default Services;


