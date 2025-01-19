import React, { FunctionComponent } from 'react';

const Nosotros:FunctionComponent = () => {
    return (
        <div className="bg-white w-full h-screen text-sm flex sm:flex-row flex-col justify-center items-center">
            <div className="sm:w-1/2 w-full px-16 flex flex-col justify-center items-center">
                <div className="sm:text-[49px] text-[30px] py-3 px-8 leading-[108.16%] font-semibold text-black"style={{fontFamily: 'Outfit',WebkitLineClamp: 3,WebkitBoxOrient: 'vertical',}}>Liderando la nueva era de la transformación digital</div>
            	<div className='w-full flex flex-row flex-wrap py-10 text-black'>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Personaliza tu página</h2>
                        <p>Elige una plantilla y adáptala a las necesidades de tu empresa en Galápagos, o responde algunas preguntas para obtener una página web gratuita, diseñada especialmente para ti.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Añade funcionalidades avanzadas</h2>
                        <p>Integra un blog, una tienda online o un sistema de reservas para tu negocio en el archipiélago. Siempre podrás añadir más herramientas a medida que tu empresa crezca.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Optimiza para móviles</h2>
                        <p>Asegúrate de que tu página se vea perfecta en dispositivos móviles, y personaliza la versión móvil para una experiencia óptima, adaptada a los visitantes locales e internacionales.</p>
                    </div>
                    <div className='w-1/2 px-10 mb-10'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <h2 className='font-semibols text-[20px] py-5'>Optimiza para SEO</h2>
                        <p>Aprovecha nuestras herramientas avanzadas de SEO para aumentar tu tráfico orgánico y mejorar la visibilidad de tu negocio en las búsquedas, destacando en el competitivo mercado turístico de Galápagos.</p>
                    </div>
                </div>
            </div>
            <div className="sm:w-1/2 bg-[#f4f4f4] w-full h-full bg-contain flex flex-row justify-between">
				<img src='/images/background.jpeg' className='h-[300px]'></img>
			</div>
      	</div>
    );
}
export default Nosotros;