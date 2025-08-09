
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from './custom-button';
import { MessageSquare } from 'lucide-react';

interface ProfileCardProps {
  id: string;
  name: string;
  role: 'investor' | 'entrepreneur';
  companyName?: string;
  tagline: string;
  imageUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  role,
  companyName,
  tagline,
  imageUrl,
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/${role}/${id}`);
  };
  
  const handleMessage = () => {
    navigate(`/messages/${id}`);
  };
  
  return (
    <div className="business-card p-5 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-business-100 flex items-center justify-center text-business-600 font-bold text-lg mr-3">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="h-full w-full rounded-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground capitalize">
            {role === 'entrepreneur' && companyName 
              ? `${companyName} · ${role}` 
              : role}
          </p>
        </div>
      </div>
      
      <p className="text-sm mb-4 flex-grow">{tagline}</p>
      
      <div className="flex space-x-2 mt-auto">
        <CustomButton 
          variant="outline" 
          size="sm"
          className="flex-1"
          onClick={handleViewProfile}
        >
          View Profile
        </CustomButton>
        
        <CustomButton 
          variant="secondary" 
          size="sm"
          onClick={handleMessage}
        >
          <MessageSquare className="h-4 w-4" />
        </CustomButton>
      </div>
    </div>
  );
};

export default ProfileCard;
