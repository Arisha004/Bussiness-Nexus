
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import ProfileCard from '../components/ui/profile-card';

const Entrepreneurs = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'entrepreneur' as const,
    companyName: 'EcoTech Solutions',
    tagline: 'Sustainable technology solutions for reducing carbon footprint in industrial processes.',
    imageUrl: ''
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'entrepreneur' as const,
    companyName: 'HealthAI',
    tagline: 'AI-powered diagnostics tools that help identify health issues early with 95% accuracy.',
    imageUrl: ''
  },
  {
    id: '3',
    name: 'Jessica Williams',
    role: 'entrepreneur' as const,
    companyName: 'FinEdge',
    tagline: 'Next-generation financial platform for underserved communities with microloans and education.',
    imageUrl: ''
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'entrepreneur' as const,
    companyName: 'Urban Harvest',
    tagline: 'Vertical farming solutions for urban environments that increase yield while reducing water usage by 70%.',
    imageUrl: ''
  }
];

const InvestorDashboard: React.FC = () => {
  const [entrepreneurs, setEntrepreneurs] = useState(mockEntrepreneurs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchEntrepreneurs = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEntrepreneurs(mockEntrepreneurs);
      } catch (error) {
        console.error('Error fetching entrepreneurs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntrepreneurs();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Discover Entrepreneurs</h1>
        <p className="text-muted-foreground">
          Find promising entrepreneurs and their ventures to invest in
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="business-card p-5 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex space-x-2 mt-4">
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entrepreneurs.map((entrepreneur) => (
            <ProfileCard
              key={entrepreneur.id}
              id={entrepreneur.id}
              name={entrepreneur.name}
              role={entrepreneur.role}
              companyName={entrepreneur.companyName}
              tagline={entrepreneur.tagline}
              imageUrl={entrepreneur.imageUrl}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default InvestorDashboard;
