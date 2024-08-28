import { CommentPatchPayload } from '../../lib/types/commentsType';

export const patchCommentsApi = async (payload: CommentPatchPayload) => {
  try {
    const response = await fetch('/api/post/comments/patch', {
      method: 'PATCH',
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

    return null;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return null;
  }
};