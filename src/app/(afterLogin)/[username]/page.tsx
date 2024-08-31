
import { getUserData } from '@/_features/i/model/api/getUserData';
import { UserInfo } from '@/_features/user';
import { DetailHeader } from '@/_widget';
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
        <DetailHeader title={username} />
        <UserInfo user={user} />
      </div>
    )
}