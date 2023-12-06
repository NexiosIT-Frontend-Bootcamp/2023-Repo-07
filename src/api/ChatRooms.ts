import { ChatRoom } from '../model/ChatRoom';

const apiUrl = 'https://lobster-app-osqfh.ondigitalocean.app/rooms';

export const getChatRooms = async (accessToken: string): Promise<ChatRoom[]> => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      // Add any additional options if needed
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chat rooms');
    }

    const chatRooms: ChatRoom[] = await response.json();
    return chatRooms;
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    throw error;
  }
};

export const createChatRoom = async (accessToken: string, chatRoomData: ChatRoom): Promise<void> => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(chatRoomData),
    });
    console.log(response)

    if (!response.ok) {
      throw new Error('Failed to create a new chat room');
    }

    // If needed, you can handle the response for POST requests
    // const responseData = await response.json();
    // console.log('Response data:', responseData);
  } catch (error) {
    console.error('Error creating a new chat room:', error);
    throw error;
  }
};
