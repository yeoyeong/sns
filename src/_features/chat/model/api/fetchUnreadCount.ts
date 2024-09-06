export const fetchUnreadCount = async ({
  roomId,
}: { roomId?: string } = {}) => {
  const params = roomId ? `roomId=${roomId}` : '';
  const response = await fetch(`/api/chat/messages/unread?${params}`);
  const data = await response.json();
  return data;
};