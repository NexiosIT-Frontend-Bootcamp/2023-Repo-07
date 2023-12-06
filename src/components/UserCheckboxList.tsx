// UserCheckboxList.tsx
import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { fetchUsers } from '../api/Users';
import { User } from '../model/User'; // Adjust the path accordingly

interface UserCheckboxListProps {
  accessToken: string;
  onUsersSelected: (selectedUsers: string[]) => void;
}

const UserCheckboxList: React.FC<UserCheckboxListProps> = ({ accessToken, onUsersSelected }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers(accessToken);
      setUsers(fetchedUsers);
    };

    loadUsers();
  }, [accessToken]);

  const handleCheckboxChange = (username: string) => {
    // Toggle the selected user
    const updatedUsers = users.map((user) =>
      user.username === username ? { ...user, selected: !user.selected } : user
    );

    setUsers(updatedUsers);
    const selectedUsernames = updatedUsers
      .filter((user) => user.selected)
      .map((user) => user.username);
    onUsersSelected(selectedUsernames);
  };

  return (
    <div>
      <p>Select users:</p>
      {users.map((user) => (
        <FormControlLabel
          key={user.username}
          control={
            <Checkbox
              checked={user.selected || false}
              onChange={() => handleCheckboxChange(user.username)}
            />
          }
          label={user.username}
        />
      ))}
    </div>
  );
};

export default UserCheckboxList;
