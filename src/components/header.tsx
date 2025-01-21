import React, { FunctionComponent } from 'react';

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
					<div className="w-full top-0 right-0 left-0 h-[70px] flex flex-row items-center justify-between px-10 box-border text-2xl text-white font-dm-serif-display">
        				<div className="flex flex-row items-center justify-start gap-1">
          					<img className="w-8 h-8 relative object-cover" alt="" src="https://res.cloudinary.com/logicielapplab/image/upload/v1677460943/LogicielApplab/LOGO_NUEVO_LOGICIEL_125_efllcs.png" />
          					<div className="relative leading-none px-3">Logieciel Applab</div>
        				</div>
        				<div className="flex flex-row items-center justify-end gap-[30px] text-base text-white font-dm-sans">
          					<a href='#nosotros-component'><div className="relative leading-none whitespace-pre-wrap">Nosotros</div></a>
          					<div className="relative leading-none whitespace-pre-wrap">Servicios</div>
          					<div className="relative leading-none whitespace-pre-wrap">Clientes</div>
          					<div className="relative leading-none whitespace-pre-wrap">Contacto</div>
        				</div>
      				</div>	
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