import React, { FunctionComponent } from 'react';
import Header from './header';
import Footer from './footer';
import Nosotros from './nosotros';

const DoraAIAModernFuturistic:FunctionComponent = () => {
  	return (
		<div className="w-full relative bg-white text-left text-base text-[#86858c] font-dm-sans">
			<Header></Header>
            <Nosotros></Nosotros>
			<div className='bg-black w-full h-[500px]'>

			</div>
			<Footer></Footer>
    	</div>
		);
};

export default DoraAIAModernFuturistic;
