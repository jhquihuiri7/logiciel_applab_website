import React, { FunctionComponent } from 'react';
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
  return (
    <div  id="clients-component"  className="relative flex w-full h-[800px] py-10 sm:py-0 sm:h-screen bg-black flex-col items-center justify-center overflow-hidden md:shadow-xl">
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

