
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated } = useAuth();
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard if roles don't match
    if (user?.role === 'investor') {
      return <Navigate to="/dashboard/investor" replace />;
    } else if (user?.role === 'entrepreneur') {
      return <Navigate to="/dashboard/entrepreneur" replace />;
    } else {
      // If role is unknown, redirect to login
      return <Navigate to="/login" replace />;
    }
  }
  
  // User is authenticated and has the required role
  return <>{children}</>;
};

export default ProtectedRoute;
