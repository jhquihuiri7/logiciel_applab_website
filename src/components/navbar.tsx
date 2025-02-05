"use client"
import React, {useState, useEffect } from "react";
import Link from 'next/link';

const navLinks = [
  {
      id:"nosotros-component",
      title:"Nosotros"
  },
  {
      id:"services-component",
      title:"Servicios"
  },{
      id:"clients-component",
      title:"Clientes"
  }
]

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [isLandscape, setIsLandscape] = useState<boolean | null>(null);
        
      useEffect(() => {
        if (typeof window !== "undefined") {
          setIsLandscape(window.innerWidth > window.innerHeight);
          const handleResize = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
          };
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }
      }, []);
      if (isLandscape === null) return null;
    return (
        <nav className={`px-6 sm:px-16 w-full flex justify-center items-center fixed py-1 top-0 z-20 bg-white`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <img src="https://res.cloudinary.com/logicielapplab/image/upload/v1677460943/LogicielApplab/LOGO_NUEVO_LOGICIEL_125_efllcs.png" alt="logo" className="w-10 h-10 object-contain"/>
                    <p className="text-black text-2xl font-bold cursor-pointer flex">
                        Logiciel Applab
                    </p>
                </Link>
                <ul className={`list-none ${isLandscape ? "hidden" : "hidden sm:flex"} flex-row gap-10`}>
                    {navLinks.map((link)=>(
                        <li key={link.id} className={`text-gray-700 hover:text-blue-700 text-base hover:font-medium cursor-pointer`}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
                <div className={`${isLandscape ? "flex" : "flex sm:hidden"} felx-1 justify-end items-center`}>
                    <img
                        src={toggle?"/close.svg":"/menu.svg"}
                        alt="menu"
                        className="w-[20px] h-[20px] object-contain cursor-pointer"
                        onClick={()=>setToggle(!toggle)}
                    />
                </div>
                <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-white absolute top-20  right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                    <ul className="list-none flex flex-col justify-end items-start gap-4">
                        {navLinks.map((link)=>(
                            <li key={link.id} className={`text-gray-700 hover:text-blue-700 font-poppins font-medium cursor-pointer text-[16px]`}
                                onClick={()=>{
                                    setToggle(!toggle)
                                }
                                }>
                                <a href={`#${link.id}`}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar