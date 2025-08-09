
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import CustomButton from '../components/ui/custom-button';

// Mock collaboration requests
interface CollaborationRequest {
  id: string;
  investorId: string;
  investorName: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  date: string;
}

const mockRequests: CollaborationRequest[] = [
  {
    id: '1',
    investorId: '101',
    investorName: 'John Smith',
    message: 'Interested in your sustainable technology solutions. Would like to discuss potential investment opportunities.',
    status: 'pending',
    date: '2025-05-05'
  },
  {
    id: '2',
    investorId: '102',
    investorName: 'Emily Rodriguez',
    message: 'Your approach to reducing carbon footprint aligns with our investment thesis. Let\'s connect for a detailed discussion.',
    status: 'accepted',
    date: '2025-05-03'
  },
  {
    id: '3',
    investorId: '103',
    investorName: 'Robert Chen',
    message: 'We are looking to expand our portfolio in green tech. Your solution seems promising.',
    status: 'pending',
    date: '2025-05-01'
  }
];

const EntrepreneurDashboard: React.FC = () => {
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchRequests = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const updateRequestStatus = (requestId: string, newStatus: 'accepted' | 'declined') => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  const handleViewInvestorProfile = (investorId: string) => {
    // In a real app, navigate to investor profile
    console.log(`Navigate to investor profile: ${investorId}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Collaboration Requests</h1>
        <p className="text-muted-foreground">
          Manage investment requests from interested investors
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="business-card p-5 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                <div className="flex space-x-2">
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No collaboration requests yet.</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="business-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-business-100 flex items-center justify-center text-business-600 font-bold mr-3">
                      {request.investorName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{request.investorName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${getStatusBadgeClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                
                <p className="text-sm mb-4">{request.message}</p>
                
                <div className="flex justify-between items-center">
                  <CustomButton 
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewInvestorProfile(request.investorId)}
                  >
                    View Profile
                  </CustomButton>
                  
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <CustomButton 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'declined')}
                      >
                        Decline
                      </CustomButton>
                      <CustomButton 
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'accepted')}
                      >
                        Accept
                      </CustomButton>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default EntrepreneurDashboard;
