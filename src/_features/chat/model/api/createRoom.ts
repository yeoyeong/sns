import { CreateRoomDTO } from '../../lib/types';

export const createRoom = async ({ roomId, uid_1, uid_2 }: CreateRoomDTO) => {
  const createRoomResponse = await fetch('/api/chat/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId,
      participants: [uid_1, uid_2], // 참가자 목록에 현재 유저 추가
    }),
  });
  if (!createRoomResponse.ok) {
    const errorData = await createRoomResponse.json();
    console.error('Server error response:', errorData);
    throw new Error(`Failed to create room: ${errorData.message}`);
  }
  return createRoomResponse;
};