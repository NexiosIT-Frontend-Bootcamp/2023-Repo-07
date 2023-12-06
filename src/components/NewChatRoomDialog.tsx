// components/NewChatroomDialog.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import UserCheckboxList from './UserCheckboxList';
import { createChatRoom } from '../api/ChatRooms';
import { constructorChatRoom } from '../model/ChatRoom';

interface NewChatroomDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (chatroomName: string, selectedUsers: string[]) => void;
}

const NewChatroomDialog: React.FC<NewChatroomDialogProps> = ({ open, onClose, onCreate }) => {
    const accessToken = localStorage.getItem("access_token")
  const [chatroomName, setChatroomName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleCreate = async () => {
    // Validate the chatroom name if needed
    if (chatroomName.trim() !== '') {
      try {
        if(accessToken)
        {
            await createChatRoom(accessToken, constructorChatRoom(chatroomName, selectedUsers));
        }
        onCreate(chatroomName, selectedUsers);
        setChatroomName('');
        setSelectedUsers([]);
        onClose();
      } catch (error) {
        console.error('Error creating chatroom:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new chatroom</DialogTitle>
      <DialogContent>
        <TextField
          label="Chatroom Name"
          variant="outlined"
          fullWidth
          value={chatroomName}
          onChange={(e) => setChatroomName(e.target.value)}
        />
        <UserCheckboxList
          accessToken={localStorage.getItem('access_token') || ''}
          onUsersSelected={setSelectedUsers}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewChatroomDialog;
