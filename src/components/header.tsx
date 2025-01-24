import React, { FunctionComponent } from 'react';
import NavbarComponent from './navbar'


const text = `
Tu socio estratégico en la creación de sitios web personalizados 
y marketing digital con optimización SEO. 
Posiciona tu marca como líder en su sector y multiplica tus oportunidades en un 
mercado global competitivo.
`;


const Header:FunctionComponent = () => {
    return(
        <div className="bg-[#1d1f2c] w-full h-screen text-[13px] text-[#97979d]">
        		<div className="w-full h-full text-[13px] bg-[#1d1f2c] bg-[url('/images/background.jpeg')] bg-cover bg-no-repeat bg-top">		
					<NavbarComponent></NavbarComponent>
					<div className="w-full h-full sm:h-4/5">
            			<div className="w-full h-full ">
							<div className="w-full sm:px-16 px-8 h-full flex flex-col justify-center text-left text-[#fefdfe]">
								<div className="sm:w-[500px] w-full sm:mt-0 mt-52 text-[45px] sm:text-[56px] leading-[128.57%] font-semibold font-outfit inline-block line-clamp-2">Transforma tu Futuro Digital con Logiciel AppLab</div>
                				<div className="sm:w-[500px] w-full sm:my-16 py-5 text-[18px] font-medium inline-block overflow-hidden text-ellipsis line-clamp-2">{text}</div>
							</div>		
            			</div>
          			</div>
        		</div>
      		</div>
    );
};

export default Header;