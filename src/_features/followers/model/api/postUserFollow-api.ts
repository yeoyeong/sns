import { Following } from '../../lib/types/follow';

export const postToFollowApi = async ({
  followerId,
  followingId,
}: Following): Promise<any> => {
  try {
    const response = await fetch('/api/user/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ followerId, followingId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to follow user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error following user:', error.message);
      throw error; // 필요한 경우 호출자에게 오류를 다시 던질 수 있습니다.
    } else {
      console.error('Unknown error occurred while following user');
      throw new Error('Unknown error occurred while following user');
    }
  }
};
