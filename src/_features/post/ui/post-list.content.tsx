import { v4 as uuidv4 } from 'uuid';

type Props = {
  content: string;
};

export default function PostListContent({ content }: Props) {
  const contentArray = content.split('');
  const adjustedLength = Math.ceil(contentArray.length / 10) * 12; // 배열 길이를 12의 배수로 올림
  while (contentArray.length < adjustedLength) {
    contentArray.push(''); // 빈 문자열 추가
  }

  return (
    <div className='mt-1 grid w-[430px] grid-cols-12 border-l border-t border-solid border-blue-300'>
      {contentArray.map(char => (
        <div
          className='flex aspect-square items-center justify-center border-b border-r border-solid border-blue-300 text-lg'
          key={uuidv4()}>
          {char}
        </div>
      ))}
    </div>
  );
}