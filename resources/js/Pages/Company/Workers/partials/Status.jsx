import React from "react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Status({ handleStartEndShift, workerStatus, clickAvailable = false }) {
    const [hoverState, setHoverState] = useState(false);
    const handleMouseEnter = () => {
        setHoverState(true);
    }
    const handleMouseLeave = () => {
        setHoverState(false);
    }
    function handleClick() {
        handleStartEndShift();
    }
    return (
        clickAvailable
            ?
            <div
                className={`hover:cursor-pointer w-28 p-1 px-2 rounded-lg justify-normal text-white ${hoverState ?
                    (workerStatus.status ? 'bg-red-400 text-red-800' : 'bg-green-400 text-green-800') :
                    (workerStatus.status ? 'bg-green-400 text-white' : 'bg-red-400 text-white')
                    }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                style={{ fontSize: '0.5rem' }}
            >
                {hoverState ?
                    (workerStatus.status ? 'SALIR' : 'ENTRAR') :
                    (workerStatus.status ? 'TRABAJANDO' : 'FUERA DEL TRABAJO')
                }
            </div>

            :

            <button
                className={`hover:cursor-pointer w-28 p-1 px-2 rounded-lg justify-normal text-white ${(workerStatus.status ? 'bg-green-400 text-white' : 'bg-red-400 text-white')
                    }`}

                style={{ fontSize: '0.5rem' }}
            >
                {
                    workerStatus.status ? 'TRABAJANDO' : 'FUERA DEL TRABAJO'
                }
            </button>

    );
}
