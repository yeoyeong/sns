import supabase from '@/_shared/util/supabase/client';
import { NextResponse } from 'next/server';

type Comment = {
  id: number;
  post_id: number;
  parent_id: number | null;
  content: string;
  nickname: string;
  created_at: string;
  replies?: Comment[];
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get('post_id');

    if (!postId) {
      return NextResponse.json(
        { error: 'post_id is required' },
        { status: 400 }
      );
    }

    // 댓글 및 대댓글 가져오기
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 댓글과 대댓글을 구조화
    const commentTree = comments.reduce((acc, comment) => {
      if (comment.parent_id) {
        const parentComment = acc.find(
          (c: Comment) => c.id === comment.parent_id
        );
        if (parentComment) {
          parentComment.replies = parentComment.replies || [];
          parentComment.replies.push(comment);
        }
      } else {
        acc.push(comment);
      }
      return acc;
    }, []);

    return NextResponse.json({ comments: commentTree }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}