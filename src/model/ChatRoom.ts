export interface ChatRoom {
    name: string;
    allowed_users: string[]; 
}

// Constructor function
export function constructorChatRoom(name: string, allowedUsers: string[]): ChatRoom {
    return {
      name,
      allowed_users: allowedUsers,
    };
  }
  