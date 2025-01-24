import React, { FunctionComponent } from 'react';

const Card = ({
  img,
  title,
  description
}: {
  img: string;
  title: string;
  description:string;
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
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p className='text-[#616264]'>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    );
  };


const Services:FunctionComponent = () => {
    return (
        <div id="services-component" className='w-full h-fit s:h-screen p-10 flex flex-col justify-center items-center'>
          <h3 className='font-bold text-4xl'>Nuestros Servicios</h3>
          <div className='w-full my-5 flex flex-col sm:flex-row justify-around'>
            <Card 
              img="/images/servicios1.jpeg" 
              title='Diseño web a medida'
              description='Crea tu propia página con nosotros, con calidad profesional, ideal para promocionar tu negocio, exhibir tus proyectos o lanzar tu tienda online'>
            </Card>
            <Card 
              img='/images/servicios2.jpeg' 
              title='Optimización para motores de búsqueda'
              description='Obtén funciones de SEO para aumentar la presencia de tu sitio en los principales resultados de búsqueda'>
            </Card>
          </div>
        </div>

    );
}

export default Services;


