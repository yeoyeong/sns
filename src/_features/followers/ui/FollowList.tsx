// followerId, followingId

import Link from "next/link";
import { SetStateAction } from "react";
import UserIcon from "@/_widget/user/UserIcon";
import BackButton from "@/_shared/ui/button/BackButton";
import { useUserStore } from "@/_shared/util/userStore";
import useGetFollowList from "../model/query/useGetFollowList";
import FollowButton from "./FollowButton";





type Props ={
  userId:string,
  type:string,
  setIsOpen:React.Dispatch<SetStateAction<boolean>>;
}
export default function FollowList({userId, type, setIsOpen}:Props) {
  const {data, isLoading} = useGetFollowList({userId,type, limit:10})
  const {user:myData}= useUserStore()
  if(!myData || isLoading) {
    return (
    <div className='bg-white-custom left-0 fixed top-0 z-20 flex h-screen w-full justify-center pt-20'>
      <div className='bg-white-100 flex h-[600px] w-[420px] flex-col shadow-md'>
        로딩중 . . .
      </div>
    </div>
    )}
  return (
  <div className='fixed top-1/2 left-1/2 bg-white-100 flex h-[600px] w-[420px] flex-col shadow-md z-20 -translate-x-1/2 -translate-y-1/2'>
    <div className='pl-2 pt-4'>
      <BackButton onClose={()=>setIsOpen(false)}/>
    </div>
    <div className="flex flex-col gap-4">
      {data.map((user)=>(
        <div className="flex justify-between px-11">
          <Link href={`/${user.userId}`} className='flex items-center gap-1'>
              <div className='block h-[14px] w-[14px] overflow-hidden rounded-full'>
                  <UserIcon profileImg={user.profileImg} />
              </div>
              <p className='text-lg font-bold'>{user.nickname}</p>
          </Link>
          {/* followerId 내 아이디 */}
          <FollowButton followerId={myData.uid} followingId={user.user_uid}/>
        </div>
        ))}
    </div>
  </div>
);
}
