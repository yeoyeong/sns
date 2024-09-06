import { generateRoomId } from '@/_shared/lib/generateRoomId';
import Link from 'next/link';

type Props = {
  uid_1: string;
  uid_2: string;
  children: React.ReactNode;
};

export default function OpenChatLinkProvider({
  uid_1,
  uid_2,
  children,
}: Props) {
  return (
    <Link
      href={{
        pathname: `/chat/${generateRoomId(uid_1, uid_2)}`,
        query: {
          uid_1,
          uid_2,
        },
      }}>
      {children}
    </Link>
  );
  // return (<Link href={`/chat/${generateRoomId(uid_1, uid_2)}`}>{children}</Link>);
}