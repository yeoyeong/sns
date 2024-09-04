'use client';

import { Virtuoso } from 'react-virtuoso';
import Image from 'next/image';
import { useCallback } from 'react';
import { useGetPostData } from '@/_shared/model';
import { Header } from '@/_widget';
import logo from '@/_shared/asset/logo/logo.png';
import PostCard from './post-list.card';

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
      <div>
        <Image src={logo} alt='사이트 로고' width={126} height={29} />
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