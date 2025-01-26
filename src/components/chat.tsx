import React, { FunctionComponent } from 'react';

const url = "https://wa.me/593997613568?text=Hola%2C%20estoy%20interesado%20en%20desarrollar%20mi%20p%C3%A1gina%20web%20con%20ustedes.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%3F";

const Chat:FunctionComponent = () => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <div className="fixed top-80 bg-white h-32 w-7 shadow-xl">
              <p className="text-lg text-center rotate-90 pl-4">Escribenos</p>
            </div>
        </a>
    );
}

export default Chat;