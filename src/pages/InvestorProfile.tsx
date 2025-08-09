
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import CustomButton from '../components/ui/custom-button';
import { MessageSquare } from 'lucide-react';

interface InvestorProfile {
  id: string;
  name: string;
  bio: string;
  email: string;
  investmentInterests: string[];
  currentInvestments: Array<{
    name: string;
    description: string;
  }>;
  investmentRange: string;
}

const mockInvestorProfile: InvestorProfile = {
  id: '123',
  name: 'John Smith',
  bio: 'Experienced investor with 15 years in technology and sustainable energy sectors. Previously founded and sold two tech startups. Looking for innovative solutions with potential for global impact.',
  email: 'john.smith@example.com',
  investmentInterests: ['Clean Tech', 'FinTech', 'Health Tech', 'AI Solutions'],
  currentInvestments: [
    { name: 'GreenEnergy Corp', description: 'Renewable energy solutions for commercial buildings' },
    { name: 'FinanceAI', description: 'AI-powered personal finance management platform' },
    { name: 'MedTech Innovations', description: 'Digital health monitoring devices' }
  ],
  investmentRange: '$250K - $1M'
};

const InvestorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real app, this would fetch from an API based on the ID
        await new Promise(resolve => setTimeout(resolve, 800));
        setProfile(mockInvestorProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="flex space-x-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
            ))}
          </div>
          
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="space-y-3 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Investor profile not found</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold mb-6">{profile.name}</h1>
        <CustomButton
          variant="primary"
          className="flex items-center space-x-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Message</span>
        </CustomButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="business-card p-6">
            <h2 className="font-semibold mb-2">About</h2>
            <p className="text-gray-700">{profile.bio}</p>
          </div>

          <div className="business-card p-6">
            <h2 className="font-semibold mb-4">Current Investments</h2>
            <div className="space-y-4">
              {profile.currentInvestments.map((investment, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium">{investment.name}</h3>
                  <p className="text-sm text-gray-600">{investment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="business-card p-6">
            <h2 className="font-semibold mb-4">Investment Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.investmentInterests.map((interest, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-business-50 text-business-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="business-card p-6">
            <h2 className="font-semibold mb-4">Investment Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Typical Investment Range</p>
                <p className="font-medium">{profile.investmentRange}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorProfile;
