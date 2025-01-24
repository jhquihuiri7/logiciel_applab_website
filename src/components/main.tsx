import React, { FunctionComponent } from 'react';
import Header from './header';
import Footer from './footer';
import Nosotros from './nosotros';
import Services from './services'
import Clients from './clients'
import Chat from './chat';

const DoraAIAModernFuturistic:FunctionComponent = () => {
  	return (
		<div className="w-full relative bg-white text-left text-black">
			<Header></Header>
            <Nosotros></Nosotros>
			<Services></Services>
			<Clients></Clients>
			<Footer></Footer>
            <Chat></Chat>
    	</div>
		);
};

export default DoraAIAModernFuturistic;
