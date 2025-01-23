import React, { FunctionComponent } from 'react';

const Card = () => {
    return (
      <div className="card bg-base-100 w-full sm:w-[40%] mb-4 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Shoes!
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
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
            <Card></Card>
            <Card></Card>
          </div>
        </div>

    );
}

export default Services;


