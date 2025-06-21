import { Navigate } from 'react-router-dom';

// Dummy authentication logic (replace with real auth check)
const isAuthenticated = () => {
  // Example: check if token exists in localStorage
  const token = localStorage.getItem('authToken');
  return !!token;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

