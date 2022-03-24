import React from 'react'
import PublicLayout from '../Layouts/PublicLayout';
import SignupForm from '../components/SignupForm';
export const Signup = () => {

    return (
        <PublicLayout FormTitle="Sign up to get started!" Form={SignupForm} />
    );
};

export default Signup