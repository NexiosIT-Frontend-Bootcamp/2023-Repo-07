interface UserDataLogin {
    email: string;
    password: string;
  }
  
  const LoginUser = async (userData: UserDataLogin) => {
    try {
      const response = await fetch('https://lobster-app-osqfh.ondigitalocean.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Registration successful
        const responseData = await response.json();
        return responseData; // You can modify this based on the API response format
      } else {
        // Registration failed
        const errorData = await response.json();
        throw new Error(errorData.message); // You can modify this based on the API error response format
      }
    } catch (error) {
      throw new Error('Error during login: ' + error);
    }
  };
  
  export default LoginUser;
  