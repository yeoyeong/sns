export type CommentPayload = {
  post_id: number;
  content: string;
  parent_id?: number | null; // parent_id는 선택적이며 null일 수도 있음
};

export type CommentPatchPayload = {
  comment_id: number;
  content: string;
};

export type CommentDeletePayload = {
  comment_id:number
};

export type Comment = CommentPayload & {
    id: number;
    user_id: string | null;
    userId: string | null;
    created_at: string;
    updated_at:string;
    nickname: string;
}
