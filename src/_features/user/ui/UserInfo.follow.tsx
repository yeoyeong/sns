import FollowList from '@/_features/followers/ui/FollowList';
import useOutsideClick from '@/_shared/lib/hooks/useOutsideClick';
import { useState } from 'react';

type Props = {
  followerCount: number;
  followingCount: number;
  userId: string;
};

export default function UserInfoFollow({
  followerCount,
  followingCount,
  userId,
}: Props) {
  const { isOpen, setIsOpen, ref } = useOutsideClick();
  const [type, setType] = useState('');

  const followTypeHandler = (followType: string) => {
    setType(followType);
    setIsOpen(true);
  };
  return (
    <>
      <li>
        <p>
          <button
            onClick={() => followTypeHandler('follower')}
            type='button'
            className='mr-1 font-bold'>
            팔로워
          </button>
          {followerCount}
        </p>
      </li>
      <li>
        <p>
          <button
            onClick={() => followTypeHandler('following')}
            type='button'
            className='mr-1 font-bold'>
            팔로잉
          </button>
          {followingCount}
        </p>
      </li>
      <div ref={ref}>
        {isOpen && (
          <FollowList userId={userId} type={type} setIsOpen={setIsOpen} />
        )}
      </div>
    </>
  );
}