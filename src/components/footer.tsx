import React, { FunctionComponent } from 'react';
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
 
const Footer:FunctionComponent = () => {
    return (
        <div id="footer" className="relative bg-[#f4f4f4] w-full px-10 pb-2 pt-10">
            <div className='w-full flex flex-col-reverse sm:flex-row justify-between items-center sm:items-end'>
                <div>
                    <p>© 2021 - 2025 Logiciel Applab</p>
                </div>
                <div className="relative flex flex-row justify-around">
                  <ShimmerButton className='mx-1 h-[40px] w-[5px]' shimmerColor="#000000" borderRadius="200px" background="#ffffff">
                    <FontAwesomeIcon icon={faFacebook} size="xl" style={{ color: "#4267B2" }}/>
                  </ShimmerButton>
                  <ShimmerButton className='mx-1 h-[40px] w-[5px]' shimmerColor="#000000" borderRadius="200px" background="#ffffff">
                    <FontAwesomeIcon icon={faInstagram} size="xl" style={{ color: "#F56040" }}/>
                  </ShimmerButton>
                </div>
                <div>
                  <img src="https://res.cloudinary.com/logicielapplab/image/upload/v1677460943/LogicielApplab/LOGO_NUEVO_LOGICIEL_125_efllcs.png" className="animate-bounce h-16 mr-3"
                             alt="Logiciel Applab Logo"/>
                </div>
            </div>
        </div>
    );
}

export default Footer;