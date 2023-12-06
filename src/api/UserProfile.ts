interface UserProfile {
    username: string;
    // Add other user profile fields as needed
  }
  
  const fetchUserProfile = async (accessToken: string): Promise<UserProfile> => {
    try {
      const response = await fetch('https://lobster-app-osqfh.ondigitalocean.app/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const userProfile: UserProfile = await response.json();
      return userProfile;
    } catch (error) {
      throw new Error(`Error fetching user profile: ${error}`);
    }
  };
  
  export default fetchUserProfile;
  