type Payload = {
  pageParam: number;
  limit: number;
  userId: string | null;
};

export const getPostApi = async ({
  pageParam = 1,
  limit = 5,
  userId = null,
}: Payload) => {
  try {
    const response = await fetch(
      `/api/post/get?page=${pageParam}&limit=${limit}&user_id=${userId}`,
      {
        method: 'GET',
      }
    );

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
  