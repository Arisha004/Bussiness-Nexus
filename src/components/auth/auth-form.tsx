
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import CustomButton from '../ui/custom-button';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('investor');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password, role);
        // Redirect based on role
        navigate(role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur');
      } else {
        await register(name, email, password, role);
        // Redirect based on role
        navigate(role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur');
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          {mode === 'login' 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <a 
            href={mode === 'login' ? '/register' : '/login'} 
            className="font-medium text-business-500 hover:text-business-600"
          >
            {mode === 'login' ? 'Register now' : 'Sign in'}
          </a>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 p-3 sm:p-4 rounded-md border border-red-200 text-red-800 text-xs sm:text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            type="button"
            className={`flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-md border ${
              role === 'investor'
                ? 'bg-business-50 border-business-200 text-business-700'
                : 'bg-white border-gray-200 text-gray-500'
            }`}
            onClick={() => setRole('investor')}
          >
            Investor
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-md border ${
              role === 'entrepreneur'
                ? 'bg-business-50 border-business-200 text-business-700'
                : 'bg-white border-gray-200 text-gray-500'
            }`}
            onClick={() => setRole('entrepreneur')}
          >
            Entrepreneur
          </button>
        </div>

        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input mt-1 w-full text-sm sm:text-base"
              placeholder="Jane Smith"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input mt-1 w-full text-sm sm:text-base"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input mt-1 w-full text-sm sm:text-base"
            placeholder="••••••••"
          />
        </div>

        <CustomButton
          type="submit"
          isLoading={isLoading}
          className="w-full mt-2"
        >
          {mode === 'login' ? 'Sign in' : 'Register'}
        </CustomButton>
      </form>
    </div>
  );
};

export default AuthForm;
