import { User } from '../model/User.ts';
  
  export const fetchUsers = async (accessToken: string): Promise<User[]> => {
    try {
      const response = await fetch('https://lobster-app-osqfh.ondigitalocean.app/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
  
      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  