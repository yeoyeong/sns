import { Comment } from '../../lib/types/commentsType';

export const getCommentsApi = async ({
  post_id,
}: {
  post_id: number;
}): Promise<Comment[]> => {
  try {
    const response = await fetch(`/api/post/comments?post_id=${post_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch comments');
    }

    const data = await response.json();
    return data.comments;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
    