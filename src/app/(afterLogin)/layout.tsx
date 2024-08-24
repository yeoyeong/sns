import { getUserData } from '@/_features/i/model/api/getUserData';
import { Header } from '@/_widget';

export default async function AfterLoginLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const user = await getUserData(null);
  return (
    <>
      <Header user={user} />
      {modal && modal}
      {children}
    </>
  );
}