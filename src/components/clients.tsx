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
      className="relative w-[700px] cursor-pointer overflow-hidden rounded-xl border"
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
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden md:shadow-xl">
      <h3 className='font-bold text-4xl'>Páginas web diseñadas para crecer sin límites</h3>
      <span className='text-xl my-5'>¿Buscas inspiración? Descubre esta colección de sitios web creados por usuarios de Logiciel AppLab como tú.</span>
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}


export default Clients;

