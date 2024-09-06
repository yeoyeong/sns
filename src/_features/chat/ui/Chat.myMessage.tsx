import Image from 'next/image';
import { Message } from '../lib/types';

type Props = {
  message: Message;
};
export default function ChatMyMessage({ message }: Props) {
  return (
    <div key={message.id} className='flex flex-col items-end'>
      <div className='flex items-center gap-1'>
        <span className='font-bold text-gray-300'>나</span>
      </div>
      <div className='my-1 ml-4 flex gap-2'>
        {Array.isArray(message.image_url) &&
          message.image_url.map(url => {
            console.log(url);
            return <Image src={url} alt='uploaded' width={50} height={50} />;
          })}
      </div>
      <p className='ml-4 text-4xl'>
        <span className='mr-3 text-xs text-gray-300'>
          {!message.is_read && '안읽음'}
        </span>
        {message.content}
      </p>
    </div>
  );
}