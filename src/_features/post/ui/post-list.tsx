'use client';

import { Virtuoso } from 'react-virtuoso';
import { useCallback } from 'react';
import { useGetPostData } from '@/_shared/model';
import { Header } from '@/_widget';
import HeaderSkeleton from '@/_widget/header/HeaderSkeleton';
import PostCard from './post-list.card';
import PostCardSkeleton from './post-list.cardSkeleton';

// import PostCard from './post-list.card';

export default function PostList() {
  const { data: posts, isSuccess, isLoading, fetchMore } = useGetPostData();

  const rowRenderer = useCallback(
    (index: number) => {
      const post = posts[index];

      return (
        <div key={post.id}>
          <PostCard data={post} length={posts.length} />
        </div>
      );
    },
    [posts]
  );

  const headerRenderer = useCallback(() => {
    return <Header />;
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
        }}>
        <HeaderSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    );
  if (isSuccess) {
    return (
      <Virtuoso
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
        }}
        totalCount={posts.length}
        itemContent={(index: number) => rowRenderer(index)}
        endReached={fetchMore} // 스크롤 끝에 도달했을 때 호출되는 함수
        components={{
          Header: headerRenderer,
        }}
      />
    );
  }
}