import React, { FunctionComponent } from 'react';
import { ShimmerButton } from "@/components/ui/shimmer-button";
 
const Footer:FunctionComponent = () => {
    return (
        <div id="footer" className="relative bg-white w-full px-10 pb-5 pt-10">
            <div className='w-full flex flex-col-reverse sm:flex-row justify-between items-center sm:items-end'>
                <div>
                    <p>© 2021 - 2025 Logiciel Applab</p>
                </div>
                <div className="relative flex flex-row justify-around">
                  <ShimmerButton className='mx-2' shimmerColor="#000000" background="#ffffff">
                    <p className='text-black'>X</p>
                  </ShimmerButton>
                  <ShimmerButton className='mx-2'>
                    X
                  </ShimmerButton>
                </div>
                <div>
                  <img src="https://res.cloudinary.com/logicielapplab/image/upload/v1677460943/LogicielApplab/LOGO_NUEVO_LOGICIEL_125_efllcs.png" className="animate-bounce h-20 mr-3"
                             alt="Logiciel Applab Logo"/>
                </div>
            </div>
        </div>
    );
}

export default Footer;