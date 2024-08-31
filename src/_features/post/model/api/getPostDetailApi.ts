type Payload = {
  postId: string;
};

export const getPostDetailApi = async ({ postId }: Payload) => {
  try {
    const response = await fetch(`/api/post/detail?&post_id=${postId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};