// import Link from 'next/link';
// import alarm_icon from '@/_shared/asset/icon/header-alarm_icon.png';
// import message_icon from '@/_shared/asset/icon/message_icon.png';
// import SearchIcon from '@/_shared/asset/icon/search_icon.svg';
// import logo from '@/_shared/asset/logo/logo.png';
// import Image from 'next/image';
// import { useState } from 'react';
// import { UserData } from '@/_features/i/lib/types/user';
// import UserIcon from '../user/UserIcon';
// import { useChatStore } from '@/_features/chat/model/store';

// type Props = {
//   user: UserData;
// };

// export default function HeaderMain({ user }: Props) {
//   const { unreadCount } = useChatStore();
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div className='flex w-full flex-col items-center justify-center gap-10 pt-10'>
//       <div>
//         <Link href='/'>
//           <Image src={logo} alt='사이트 로고' width={126} height={29} />
//         </Link>
//       </div>
//       <nav className='flex w-full items-center justify-center'>
//         <div className='relative mr-14'>
//           <input
//             className='focus:outline-skyblue-100 h-10 min-w-[215px] rounded-full border pl-9 transition-all duration-100 placeholder:text-gray-200 focus:pl-3 focus:outline-4'
//             placeholder='검색'
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//           />
//           {!isFocused && (
//             <div className='absolute left-3 top-1/2 -translate-y-1/2 transform'>
//               <SearchIcon />
//             </div>
//           )}
//         </div>
//         <ul className='flex gap-3'>
//           {/* <li>
//             <button type='button'>
//               <Image src={alarm_icon} alt='알림 아이콘' />
//             </button>
//           </li> */}
//           <li>
//             <Link href='/chat' className='relative'>
//               {/* TODO: 채팅 모달창 on */}
//               <Image src={message_icon} alt='메세지 아이콘' />
//               {unreadCount && (
//                 <div className='text-white-100 text-xxs absolute -right-[6px] -top-[6px] flex h-3 items-center justify-center rounded-full bg-red-500 px-1 py-2'>
//                   <div>{unreadCount}</div>
//                 </div>
//               )}
//             </Link>
//           </li>
//           <li>
//             <Link
//               href={`/${user.userId}`}
//               className='block h-[27px] w-[27px] overflow-hidden rounded-full'>
//               <UserIcon profileImg={user.profileImg} />
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }