import React from 'react'
import { FaReact, FaNode } from 'react-icons/fa';
import { SiSocketdotio, SiMongodb } from 'react-icons/si';

const PublicLayout = (props) => {
    const { Form, FormTitle } = props;
    return (
        <div className="relative h-screen">
            <img
                src="https://images.pexels.com/photos/6016342/pexels-photo-6016342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                className="absolute inset-0 object-cover w-full h-full"
                alt=""
            />
            <div className="relative bg-gray-900 bg-opacity-75 h-screen">
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                            <div className="max-w-lg mb-6 font-sans text-3xl font-bold text-white sm:text-4xl sm:leading-none">
                                Instant Messenger <br className="hidden md:block" />
                                <div className="flex gap-2 mt-4">
                                    Built using
                                    <FaReact title="React" /><FaNode title="Node.js" /><SiSocketdotio title="Socket.IO" /><SiMongodb title="MongoDB" />
                                </div>
                            </div>


                        </div>
                        {
                            Form &&
                            (<div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                    <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                        {
                                            FormTitle && (
                                                FormTitle
                                            )
                                        }
                                    </h3>
                                    <Form />
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicLayout