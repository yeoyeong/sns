export type CommentPayload = {
  post_id: number;
  content: string;
  parent_id?: number | null; // parent_id는 선택적이며 null일 수도 있음
};