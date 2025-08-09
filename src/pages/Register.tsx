
import React from 'react';
import AuthForm from '../components/auth/auth-form';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-business-600">Business Nexus</h1>
          <p className="mt-3 text-gray-500">Connecting entrepreneurs and investors</p>
        </div>
        <AuthForm mode="register" />
      </div>
    </div>
  );
};

export default Register;
