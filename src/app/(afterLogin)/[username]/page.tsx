
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

  if (!user) {
    notFound();
  }
  
  return (
      <div>
        <HeaderUser username={username} />
        <UserInfo userData={user} />
      </div>
    )
}