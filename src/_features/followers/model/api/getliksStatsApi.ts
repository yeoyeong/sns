import { FollowingPayload } from '../../lib/types/follow';

export async function getUserFollowStatsApi({ followingId }: FollowingPayload) {
  try {
    const response = await fetch(
      `/api/user/follow/stats?following_id=${followingId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || 'An error occurred while checking the like status.'
      );
    }

    const data = await response.json();
    return data.following; // true or false를 반환
  } catch (error) {
    if (error instanceof Error)
      console.error('Error following user:', error.message);
    return false; // 오류가 발생하면 기본적으로 false를 반환
  }
}