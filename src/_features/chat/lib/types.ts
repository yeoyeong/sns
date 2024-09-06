export type User = {
  id: string;
  created_at: string;
  uid: string;
  nickname: string;
  profileImg: string;
  oneLiner: string;
  userId: string;
};
  
export type Message = {
  id: string;
  content: string;
  created_at: string;
  image_url: string[] | [];
  user_uid: string;
  is_read:boolean;
  users: {
    nickname: string;
    profileImg: string;
    userId: string;
  };
}

export type Room = {
  roomId: string;
  roomName:string;
  participants: string[];
  lastMessage: Message | null;
};

export type CreateRoomDTO = {
  roomId:string;
  uid_1:string;
  uid_2:string;
}

export type SendMessageDTO = {
  content:string,
  imageUrl:(string | File)[],
  userUId:string,
  roomId:string,
}