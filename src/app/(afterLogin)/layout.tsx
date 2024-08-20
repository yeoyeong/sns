import { getUserData } from '@/_features/i/model/api/getUserData';
import { Header } from '@/_widget';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData(null);
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}