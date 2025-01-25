import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path based on where your AuthContext is located

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext

  if (!currentUser) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Return the child components if the user is authenticated
};

export default PrivateRoute;
