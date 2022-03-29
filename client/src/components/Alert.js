import React from "react";
import { FaBell } from 'react-icons/fa';
const Alert = ({ Color, Message, Show }) => {

    return (
        <>
            {Show ? (
                <div
                    className={
                        "text-white px-6 py-4 border-0 rounded relative mb-4 bg-" +
                        Color +
                        "-800"
                    }
                >
                    <span className="text-xl inline-block mr-5 align-middle">
                        <FaBell />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        {Message}
                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                        onClick={() => Show(false)}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default Alert;