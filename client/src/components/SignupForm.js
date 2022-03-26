import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';

const schema = yup.object({
    displayname: yup.string().required("Display Name is required"),
    email: yup.string().email("Email must be a valid email").required("Email is required"),
    password: yup.string().required("Password is required").min(4, "Password must be at 4 characters long").test('passwordStrength', 'Password must contain at least one Uppercase letter, Special character, Number', (value) => {
        return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
            pattern.test(value)
        )
    }),
    confirmpassword: yup.string().required("Confirm password is required").min(4, "Confirm password must be at 4 characters long").test('passwordStrength', 'Password must contain at least one Uppercase letter, Special character, Number', (value) => {
        return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
            pattern.test(value)
        )
    }).oneOf([yup.ref('password')], "Password and confirm password should match"),
}).required();

const SignupForm = () => {
    const onSubmit = (data) => {
        if (!loader) {
            setLoader(true);
            signUp(formData, (res) => {
                setLoader(false);
                if (res.status === 200) {
                    snackBar.show({
                        open: true,
                        type: "success",
                        message: res.data.message,
                    });
                    props.history.push("/signin");
                } else if (res.status === 400) {
                    let err = "";
                    for (const errorsKey in res.data.errors || {}) {
                        err += res.data.errors[errorsKey] + "\n";
                    }
                    if (err) alert(err);
                }
            });
        }
    };
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1 sm:mb-2">
                <label
                    htmlFor="displayname"
                    className="inline-block mb-1 font-medium"
                >
                    Display Name
                </label>
                <input
                    {...register("displayname")}
                    placeholder="John"
                    type="text"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"

                    name="displayname"
                />
                <p className='text-red-400'>{errors.displayname?.message}</p>
            </div>

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

            <div className="mb-1 sm:mb-2">
                <label
                    htmlFor="confirmpassword"
                    className="inline-block mb-1 font-medium"
                >
                    Confirm Password
                </label>
                <input
                    {...register("confirmpassword")}
                    placeholder="*************"
                    type="password"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"

                    name="confirmpassword"
                />
                <p className='text-red-400'>{errors.confirmpassword?.message}</p>
            </div>

            <div className="mt-4 mb-2 sm:mb-4">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                >
                    Sign up
                </button>
            </div>
            Already have an account? <Link to="/signin">Sign in here</Link>
        </form>
    )
}

export default SignupForm