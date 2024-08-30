import { CommentPayload } from '../../lib/types/commentsType';

export const createCommentsApi = async (payload: CommentPayload) => {
  try {
    const response = await fetch('/api/post/comments/create', {
      method: 'POST',
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