interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const registerUser = async (userData: UserData) => {
  try {
    const response = await fetch('https://lobster-app-osqfh.ondigitalocean.app/users', {
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
    throw new Error('Error during registration: ' + error);
  }
};

export default registerUser;
