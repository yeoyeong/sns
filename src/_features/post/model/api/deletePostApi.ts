type Payload = {
  postId: number;
};

export const deletePostApi = async ({ postId }: Payload) => {
  try {
    const response = await fetch('/api/post/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId }),
    });

    // 서버로부터의 응답이 성공적인지 확인
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete the post');
    }

    // 서버 응답이 성공적이면 결과를 JSON으로 파싱
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
  