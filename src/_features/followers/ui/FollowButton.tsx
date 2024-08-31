import CheckIcon from '@/_shared/asset/icon/check_icon.svg';
import useUserFollowStats from '../model/query/useUserFollowStats';
import usePostUserFollow from '../model/query/usePostUserFollow';

type Props = {
  followerId: string; // 내 아이디
  followingId: string;
};

export default function FollowButton({ followerId, followingId }: Props) {
  const { followingHandler } = usePostUserFollow();
  const { data: isFollowing } = useUserFollowStats({ followingId });

  return isFollowing ? (
    <button
      onClick={() =>
        followingHandler({
          followerId,
          followingId,
        })
      }
      className='flex items-center gap-1 rounded-lg bg-gray-200 px-2 font-semibold text-gray-300 shadow-md'
      type='button'>
      팔로우
      <CheckIcon stroke='red' />
    </button>
  ) : (
    <button
      onClick={() =>
        followingHandler({
          followerId,
          followingId,
        })
      }
      className='bg-blue-default text-white-100 rounded-lg px-2 shadow-md'
      type='button'>
      팔로우
    </button>
  );
}