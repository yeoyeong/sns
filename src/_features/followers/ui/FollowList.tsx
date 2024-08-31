// followerId, followingId

import useGetFollowList from "../model/query/useGetFollowList";

type Props ={
  userId:string,
  type:string
}
export default function FollowList({userId,type}:Props) {
  const {data} = useGetFollowList({userId,type})
  console.log(data)
  return <div>
    가나다
  </div>;
}
