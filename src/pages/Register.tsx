import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import RegisterUser from '../api/RegisterUser'
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('All fields are required');
      return;
    }

    // Passwords match validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Perform registration logic by calling the registerUser function
      const responseData = await RegisterUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Handle the response as needed
      console.log('Registration successful:', responseData);
      // You can redirect or perform additional actions here
    } catch (error) {
      // Handle registration error
      console.error('Error during registration:', error);
      alert(error);
      // Display an error message or handle the error as needed
    }

  };

  return (
    <Container maxWidth="sm">
      <Typography color={'black'} variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
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
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <RouterLink to="/login">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </RouterLink>
      </form>
      <Typography color={'black'} variant="body2" style={{ marginTop: '16px' }}>
        Already have an account?{' '}
        <RouterLink to="/login">
          Login here
        </RouterLink>
      </Typography>
      
    </Container>
  );
};

export default Register;
