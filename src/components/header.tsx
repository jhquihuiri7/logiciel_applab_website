"use client"
import React, { FunctionComponent, useState, useEffect } from "react";
import NavbarComponent from './navbar'


const text = `
Tu socio estratégico en la creación de sitios web personalizados 
y marketing digital con optimización SEO. 
Posiciona tu marca como líder en su sector y multiplica tus oportunidades en un 
mercado global competitivo.
`;
const textShort = `
Tu socio estratégico en la creación de sitios web personalizados 
y marketing digital con optimización SEO. 
`;


const Header:FunctionComponent = () => {
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
    return(
        <div className="bg-[#1d1f2c] w-full h-screen text-[13px] text-[#97979d]">
        		<div className="w-full h-full text-[13px] bg-[#1d1f2c] bg-[url('/images/background.png')] bg-cover bg-no-repeat bg-top">		
					<NavbarComponent></NavbarComponent>
					<div className="w-full h-full">
            			<div className="w-full h-full ">
							<div className="w-full sm:px-16 px-8 h-full flex flex-col justify-center text-left text-[#fefdfe]">
								<div className={` ${(isMobile && isLandscape) ? "mt-16 leading-[100%]" : "mt-52 sm:mt-20 leading-[128.57%]"} sm:w-[500px] w-full text-[45px] sm:text-[56px] font-semibold font-outfit inline-block`}>Transforma tu Futuro Digital con Logiciel AppLab</div>
                				<div className={`sm:w-[500px] w-full ${(isMobile && isLandscape) ? "my-4" : "my-5 sm:my-16"} text-[18px] font-medium inline-block overflow-hidden text-ellipsis`}>{(isMobile && isLandscape) ? textShort : text}</div>
							</div>		
            			</div>
          			</div>
        		</div>
      		</div>
    );
};

export default Header;