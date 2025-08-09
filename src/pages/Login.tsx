
import React from 'react';
import AuthForm from '../components/auth/auth-form';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-business-600">Business Nexus</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500">Connecting entrepreneurs and investors</p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  );
};

export default Login;
