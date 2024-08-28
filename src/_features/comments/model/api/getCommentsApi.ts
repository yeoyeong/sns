export const getCommentsApi = async ({ pageParam = 1, limit = 5 }) => {
  try {
    const response = await fetch(
      `/api/post/get?page=${pageParam}&limit=${limit}`,
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
    