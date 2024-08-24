'use client'

/**
 * id
 * user_id
 * content
 * weather
 * picture
 * created_at
 * 좋아요 갯수 / 여부
 * 댓글 갯수?
 * 댓글 달기
 * */
import { v4 as uuidv4 } from 'uuid';
import HeartIcon  from "@/_shared/asset/icon/heart_icon.svg"
import message_icon from "@/_shared/asset/icon/message_icon.png"
import Image from 'next/image';

const mock = {
  id:1,
  user_id:"123123",
  content:"점심 시간에는 친한 친구들과 대화하지않고 조용히 밥을 먹고 일어나요.",
  weather:"맑음",
  picture:["https://i.pinimg.com/564x/94/6e/5d/946e5dc23e1e1e0cef85e97b2ea43721.jpg"],
  createdAt:new Date()
}
export default function PostCard() {
  const {content, weather, picture, createdAt} = mock
  const contentArray = content.split("")
  const adjustedLength = Math.ceil(contentArray.length / 10) * 10; // 배열 길이를 10의 배수로 올림
  // contentArray의 길이를 10의 배수로 맞추기 위해 빈 문자열을 추가합니다.
  while (contentArray.length < adjustedLength) {
    contentArray.push(""); // 빈 문자열 추가
  }

  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.toLocaleString('ko-KR', { month: 'long' }); // "10월"
  const day = date.getDate();
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'long' }); // "금요일"

  return (
    <div className='mt-6'>
      <div className='w-[360px] grid card-grid border border-solid border-blue-300 items-center'>
        <p className='flex items-center justify-center h-9 border-r border-solid border-blue-300'>날짜</p>
        <ul className='flex items-center pl-2'>
        {/* <ul className='grid grid-cols-4 h-9 items-center text-lg'> */}
          <li>{year}년</li>
          <li>{month}</li>
          <li>{day}일</li>
          <li>{dayOfWeek}</li>
        </ul>
        <p className='flex items-center justify-center h-9 border-l border-r border-solid border-blue-300'>날씨</p>
        <p className='text-center'>{weather}</p>
      </div>
      <div className='w-[360px] mt-1'>
        {picture.map((url)=>(
          <img key={url} src={url} alt={url} />
        ))}
      </div>
      <div className="grid grid-cols-10 border-l mt-1 w-[360px] border-t border-solid border-blue-300">
        {contentArray.map((char) => (
          <div
            className="flex items-center justify-center w-9 aspect-square border-r border-b border-solid border-blue-300 text-lg"
            key={uuidv4()}>
            {char}
          </div>
        ))}
      </div>
      <div className='flex gap-1 mt-4'>
        <div>
          <HeartIcon fill="none" stroke="#848484"/>
          {/* <HeartIcon fill="red"/> */}
        </div>
        <div>
          <Image src={message_icon} alt="채팅 아이콘" height={24} />
        </div>
      </div>
      <div className='flex flex-col items-start gap-1 mt-2'>
        <button type="button">댓글 {0}개 모두 보기</button>
        <button type="button">댓글 달기 ...</button>
        {/* <input type="text" placeholder='댓글 입력'/> */}
      </div>
    </div>
  );
}
