import { getUserData } from '@/_features/i/model/api/getUserData';
import ClientWrapper from '@/_shared/ui/layout/ClientWrapper';

export default async function AfterLoginLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const user = await getUserData(null);

  return (
    <ClientWrapper user={user}>
      {modal && modal}
      {children}
    </ClientWrapper>
  );
}