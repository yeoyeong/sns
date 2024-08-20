export const getUserStats = async (uid: string) => {
  try {
    const response = await fetch(`/api/auth/stats?uid=${uid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error; // 오류를 던져서 useQuery가 오류를 감지할 수 있도록 함
  }
};