import React, { FunctionComponent } from 'react';

const url = "https://wa.me/593997613568?text=Quiero%20saber%20m%C3%A1s%20de%20p%C3%A1ginas%20web.";

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