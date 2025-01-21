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
        		<div className="w-full h-full text-[13px] text-[#97979d] bg-[#1d1f2c] bg-[url('/images/background.jpeg')] bg-cover bg-no-repeat bg-top">		
					<NavbarComponent></NavbarComponent>
					<div className="w-full h-4/5 text-[34px] text-[#edecee] font-outfit">
            			<div className="w-full h-full text-[34px] text-[#edecee]">
							<div className="w-full sm:px-16 px-8 h-full flex flex-col justify-center text-left text-[18px] text-[#cac1ea]">
								<div className="sm:w-[500px] w-full sm:mt-0 mt-52 text-[56px] leading-[128.57%] font-semibold text-[#fefdfe] font-outfit inline-block line-clamp-2">Transforma tu Futuro Digital con Logiciel AppLab</div>
                				<div className="sm:w-[500px] w-full sm:my-16 py-5 font-medium inline-block overflow-hidden text-ellipsis line-clamp-2">{text}</div>
							</div>		
            			</div>
          			</div>
        		</div>
      		</div>
    );
};

export default Header;