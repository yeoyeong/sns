export const SignOutApi = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('로그아웃 실패');
    }
  } catch (error) {
    console.error('Error logging out:', error);
    // TODO: 에러처리
  }
};