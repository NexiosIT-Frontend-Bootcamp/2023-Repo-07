// Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import fetchUserProfile from '../api/UserProfile';
import {getChatRooms} from '../api/ChatRooms';
import NewChatroomDialog from './NewChatRoomDialog'; // Import the new component
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  chatrooms: string[];
}

const Sidebar: React.FC<SidebarProps> = () => {
  const accessToken = localStorage.getItem('access_token');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [rooms, setRooms] = useState<string[]>([]);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false); // State for dialog visibility

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (isAuthenticated && accessToken) {
          const userProfile = await fetchUserProfile(accessToken);
          setUserName(userProfile.username);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadUserProfile();
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        if (isAuthenticated && accessToken) {
          const chatRooms = await getChatRooms(accessToken);
          console.log(chatRooms)
          setRooms(chatRooms.map((room) => room.name));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChatRooms();
  }, [isAuthenticated, accessToken]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNewChatroom = () => {
    console.log('Creating a new chatroom');
    handleMenuClose();
    setCreateDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setCreateDialogOpen(false); // Close the dialog
  };

  const handleCreateChatroom = () => {
    // Implement logic to create a new chatroom
    console.log('Creating chatroom');
    handleCloseDialog();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <div className="sidebar">
      <div className="user-info">
        <p>{userName}</p>
        <IconButton className="icon-button" onClick={handleMenuClick} size="small">
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleNewChatroom}>Create a new chatroom</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </div>
      <div className="chat-list">
        <p>Chat List:</p>
        <ul>
          {rooms.map((room) => (
            <li key={room} style={{ color: 'black' }}>
              {room}
            </li>
          ))}
        </ul>
      </div>
      <NewChatroomDialog open={isCreateDialogOpen} onClose={handleCloseDialog} onCreate={handleCreateChatroom} />
    </div>
  );
};

export default Sidebar;
