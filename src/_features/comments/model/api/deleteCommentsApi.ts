import { CommentDeletePayload } from '../../lib/types/commentsType';

export const deleteCommentsApi = async (payload: CommentDeletePayload) => {
  try {
    const response = await fetch('/api/post/comments/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.error}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return null;
  }
};