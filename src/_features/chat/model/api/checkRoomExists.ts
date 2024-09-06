export const checkRoomExists = async (roomId: string) => {
  const response = await fetch(`/api/chat/rooms?roomId=${roomId}`);
  return response.json();
};