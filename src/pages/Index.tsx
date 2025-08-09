
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80)',
        backgroundSize: 'cover',
      }}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-black/50" />
      
      <div className="z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Business Nexus</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12">
          Connect with entrepreneurs and investors to grow your business network
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={handleLogin} 
            size="lg" 
            className="px-8 py-6 text-lg"
          >
            <LogIn className="mr-2" />
            Login
          </Button>
          
          <Button 
            onClick={handleSignup} 
            variant="outline" 
            size="lg" 
            className="bg-white text-business-600 hover:bg-gray-100 border-none px-8 py-6 text-lg"
          >
            <UserPlus className="mr-2" />
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
