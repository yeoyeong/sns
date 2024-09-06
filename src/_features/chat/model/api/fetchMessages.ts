export const fetchMessages = async (roomId: string) => {
  console.log(roomId);
  const response = await fetch(`/api/chat/messages?roomId=${roomId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
};