// Login.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path
import LoginUser from '../api/LoginUser';

const Login = () => {
const navigate = useNavigate();
  const { loginn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }

    try {
        // Perform login logic by calling the LoginUser function
        const responseData = await LoginUser({
          email: formData.email,
          password: formData.password,
        });
      
        // Handle the response as needed
        console.log('Login successful:', responseData);
      
        // Call the login function from the context to set the user as authenticated
        loginn(responseData.access_token);
      
        // Navigate to the / (home) route using useNavigate
        navigate('/');
      } catch (error) {
        // Handle login error
        console.error('Error during login:', error);
        alert(error);
      }
  };

  return (
    <Container maxWidth="sm">
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Typography color="black" variant="body2" style={{ marginTop: '16px' }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/register">
          Register here
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
