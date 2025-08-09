
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import CustomButton from '../components/ui/custom-button';
import { MessageSquare } from 'lucide-react';

interface EntrepreneurProfile {
  id: string;
  name: string;
  companyName: string;
  tagline: string;
  bio: string;
  email: string;
  industry: string;
  fundingStage: string;
  fundingNeeded: string;
  pitchDeck: string; // URL in a real app
  teamMembers: Array<{
    name: string;
    role: string;
  }>;
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const mockEntrepreneurProfile: EntrepreneurProfile = {
  id: '123',
  name: 'Sarah Johnson',
  companyName: 'EcoTech Solutions',
  tagline: 'Sustainable technology solutions for reducing carbon footprint in industrial processes.',
  bio: 'EcoTech Solutions is developing innovative technology that helps industrial facilities reduce their carbon emissions by up to 40% through a combination of advanced sensors, machine learning algorithms, and optimized process controls.',
  email: 'sarah.johnson@ecotech.example',
  industry: 'CleanTech',
  fundingStage: 'Seed',
  fundingNeeded: '$500,000',
  pitchDeck: 'https://example.com/pitchdeck.pdf',
  teamMembers: [
    { name: 'Sarah Johnson', role: 'CEO & Founder' },
    { name: 'Alex Rivera', role: 'CTO' },
    { name: 'Maya Patel', role: 'Head of R&D' }
  ],
  socialLinks: {
    website: 'https://ecotech-solutions.example',
    linkedin: 'https://linkedin.com/company/ecotech-example',
    twitter: 'https://twitter.com/ecotech-example'
  }
};

const EntrepreneurProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<EntrepreneurProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real app, this would fetch from an API based on the ID
        await new Promise(resolve => setTimeout(resolve, 800));
        setProfile(mockEntrepreneurProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleSendRequest = () => {
    // In a real app, this would send a collaboration request
    setTimeout(() => {
      setRequestSent(true);
    }, 1000);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
            </div>
            <div>
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Entrepreneur profile not found</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{profile.companyName}</h1>
        <p className="text-lg text-muted-foreground">{profile.tagline}</p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 p-6 business-card">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-16 w-16 rounded-full bg-business-100 flex items-center justify-center text-business-600 font-bold text-xl mr-4">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.teamMembers[0].role}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <CustomButton
            variant="outline"
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Message</span>
          </CustomButton>
          
          <CustomButton 
            disabled={requestSent}
            onClick={handleSendRequest}
          >
            {requestSent ? 'Request Sent' : 'Send Collaboration Request'}
          </CustomButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="business-card p-6">
            <h2 className="font-semibold mb-2">Company Overview</h2>
            <p className="text-gray-700">{profile.bio}</p>
          </div>

          <div className="business-card p-6">
            <h2 className="font-semibold mb-4">Team</h2>
            <div className="space-y-4">
              {profile.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-business-50 flex items-center justify-center text-business-500 font-medium mr-3">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="business-card p-6">
            <h2 className="font-semibold mb-4">Pitch Deck</h2>
            <div className="bg-business-50 p-6 rounded-lg text-center">
              <p className="mb-3">View the company's pitch deck</p>
              <CustomButton variant="secondary">
                Download Pitch Deck
              </CustomButton>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="business-card p-6">
            <h2 className="font-semibold mb-4">Company Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium">{profile.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Funding Stage</p>
                <p className="font-medium">{profile.fundingStage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Funding Needed</p>
                <p className="font-medium">{profile.fundingNeeded}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="business-card p-6">
            <h2 className="font-semibold mb-4">Online Presence</h2>
            <div className="space-y-3">
              {profile.socialLinks.website && (
                <a 
                  href={profile.socialLinks.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-business-600 hover:text-business-800"
                >
                  Website: {profile.socialLinks.website.replace('https://', '')}
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a 
                  href={profile.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-business-600 hover:text-business-800"
                >
                  LinkedIn
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a 
                  href={profile.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-business-600 hover:text-business-800"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EntrepreneurProfile;
