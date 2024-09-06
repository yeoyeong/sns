import { SendMessageDTO } from '../../lib/types';

export const sendMessage = async ({
  content,
  imageUrl,
  userUId,
  roomId,
}: SendMessageDTO) => {
  const response = await fetch('/api/chat/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      imageUrl,
      userUId,
      roomId,
    }),
  });
  return response;
};