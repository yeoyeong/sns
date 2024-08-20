
import { getMyData } from '@/_features/i/model/api/getMyData';
import { getUserData } from '@/_features/i/model/api/getUserData';
import { HeaderUser, UserInfo } from '@/_features/user';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: Props) {
  const { username } = params;
  const user = await getUserData(username);
  const myData = await getMyData();
  
  if (!user) {
    notFound();
  }
  
  const CheckUserType =() =>{
    if(myData?.uid !== user?.uid) return false
    return true
  }
  
  return (
      <div>
        <HeaderUser username={username} />
        <UserInfo user={user} isMe={CheckUserType()}/>
      </div>
    )
}