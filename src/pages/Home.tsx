import React, {useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check authentication status and navigate if needed
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);
  
    if (!isAuthenticated) {
      return null;
    }
  
    return (
      <Sidebar chatrooms={[]}></Sidebar>
    );
  };

export default Home;
