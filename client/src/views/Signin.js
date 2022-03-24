import React from 'react'
import PublicLayout from '../Layouts/PublicLayout';
import SigninForm from '../components/SigninForm';
export const Signin = () => {

    return (
        <PublicLayout FormTitle="Sign in!" Form={SigninForm} />
    );
};

export default Signin