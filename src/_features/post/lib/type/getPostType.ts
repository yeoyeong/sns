export type GetPostType = {
  id: number;
  user_id: string;
  content: string;
  weather: string;
  picture: string[];
  created_at: string;
  commentsCount: number;
  likesCount: number;
};