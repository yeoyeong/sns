type Props = {
  createdAt: string;
};

export default function PostListDate({ createdAt }: Props) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.toLocaleString('ko-KR', { month: 'long' }); // "10월"
  const day = date.getDate();
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'long' }); // "금요일"

  return (
    <ul className='flex items-center gap-2 pl-2'>
      <li>{year}년</li>
      <li>{month}</li>
      <li>{day}일</li>
      <li>{dayOfWeek}</li>
    </ul>
  );
}