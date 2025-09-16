import React, {useState} from "react";

export function Login() {
    return (
        <div className=" main_bg grid place-items-center w-screen h-screen">
            <div className="flex flex-col items-center space-y-1">

                <h1 className="
                    text-center
                    text-orange-500
                    orbitron
                    font-normal
                    text-6xl"
                >0RYX</h1>

                <h2 className="
                text-center
                text-orange-500
                orbitron
                text-lg"
                >Version 0.0.1</h2>

                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="password"
                        placeholder="Key 1"
                        className="text-center border-b-2 border-orange-500 focus:outline-none"/>
                    <input
                        type="password"
                        placeholder="Key 2"
                        className="text-center border-b-2 border-orange-500 focus:outline-none"/>
                    <button className="
                    text-orange-500
                    px-4
                    py-2
                    text-lg
                    orbitron
                    hover:bg-orange-500
                    hover:text-white"

                    >LAUNCH</button>
                </div>
            </div>

        </div>
    )
}

