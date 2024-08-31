type Payload = {
  pageParam: number;
  limit: number;
  userId: string;
  type: string;
};

export const getFollowListApi = async ({
  pageParam = 1,
  limit = 5,
  userId,
  type
}: Payload) => {
  try {
    const response = await fetch(
      `/api/user/follow/list?page=${pageParam}&limit=${limit}&user_id=${userId}&type=${type}`,
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