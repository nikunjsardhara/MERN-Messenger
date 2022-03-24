import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';

const schema = yup.object({
    email: yup.string().email("Email must be a valid email").required("Email is required"),
    password: yup.string().required("Password is required").min(4, "Password must be at 4 characters long").test('passwordStrength', 'Password must contain at least one Uppercase letter, Special character, Number', (value) => {
        return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
            pattern.test(value)
        )
    })
}).required();

const SigninForm = () => {
    const onSubmit = data => console.log(data);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-1 sm:mb-2">
                <label
                    htmlFor="email"
                    className="inline-block mb-1 font-medium"
                >
                    Email
                </label>
                <input
                    {...register("email")}
                    placeholder="john.doe@example.org"
                    type="text"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"

                    name="email"
                />
                <p className='text-red-400'>{errors.email?.message}</p>
            </div>

            <div className="mb-1 sm:mb-2">
                <label
                    htmlFor="password"
                    className="inline-block mb-1 font-medium"
                >
                    Password
                </label>
                <input
                    {...register("password")}
                    placeholder="*************"
                    type="password"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"

                    name="password"
                />
                <p className='text-red-400'>{errors.password?.message}</p>
            </div>

            <div className="mt-4 mb-2 sm:mb-4">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                >
                    Sign in
                </button>
            </div>
            If you don't already have an account <Link to="/signup">Sign up here</Link>
        </form>
    )
}

export default SigninForm