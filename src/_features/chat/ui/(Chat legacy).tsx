// 'use client'

// import { useEffect, useState } from 'react';
// import { useParams, useSearchParams } from 'next/navigation';
// import supabase from '@/_shared/util/supabase/client';
// import { useUserStore } from '@/_shared/util/userStore';
// import useUpload from '@/_features/write/lib/hooks/useUpload';
// import { Message } from '../lib/types';

// export default function Chat() {
//   const {roomId} = useParams()
//   const searchParams = useSearchParams()
//   const uid_1 = searchParams.get('uid_1');
//   const uid_2 = searchParams.get('uid_2');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>('');
//   const [image, setImage] = useState<File | null>(null);
//   const { user }=useUserStore()
//   const { uploadImgGetUrl } = useUpload({storageName:'chatImg'})

//   const subscribeToMessages = async () => {
//     const channel = supabase
//       .channel(`room-messages-${roomId}`)
//       .on(
//         'postgres_changes',
//         {
//           event: 'INSERT',
//           schema: 'public',
//           table: 'messages',
//           filter: `room_id=eq.${roomId}`,
//         },
//         (payload) => {
//           // 비동기 함수 선언
//           const fetchUserAndAddMessage = async () => {
//             const incomingMessage = payload.new;

//             // 추가: 해당 메시지의 사용자 정보 가져오기
//             const { data: userData, error } = await supabase
//               .from('users')
//               .select('nickname, profileImg, userId')
//               .eq('uid', incomingMessage.user_uid) // 메시지의 user_uid로 사용자 정보 가져오기
//               .single();

//             if (error) {
//               console.error('Failed to fetch user data:', error);
//               return;
//             }

//             // 사용자 정보를 병합하여 메시지에 포함
//             const messageWithUser = {
//               ...incomingMessage,
//               users: userData,
//             } as Message;
//             setMessages((prevMessages) => [...prevMessages, messageWithUser]);
//           };
//           fetchUserAndAddMessage()
//         }
//       )
//       .subscribe();
//     return () => {
//       // 컴포넌트가 언마운트될 때 구독 해제
//       supabase.removeChannel(channel);
//     };
//   };

  
//   // 메시지를 읽음 상태로 표시하는 
//   useEffect(() => {
//     const markMessagesAsRead = async () => {
//       try {
//         if (!user) return; // 유저 정보가 없으면 아무것도 하지 않음
        
//         // 본인이 보낸 메시지를 제외한 읽지 않은 메시지 필터링
//         const unreadMessages = messages.filter(
//           (message) => !message.is_read && message.user_uid !== user.uid
//         );
//         if (unreadMessages.length === 0) return; // 읽지 않은 메시지가 없으면 종료

//         // 읽지 않은 메시지를 읽음 처리
//         const updatePromises = unreadMessages.map((message) =>
//           fetch('/api/chat/messages/read', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ messageId: message.id }),
//           })
//         );

//         // 모든 읽지 않은 메시지의 상태를 업데이트
//         await Promise.all(updatePromises);

//         // 클라이언트 측 메시지 상태를 업데이트하여 읽음 상태로 표시
//       setMessages((prevMessages) =>
//         prevMessages.map((message) =>
//           unreadMessages.includes(message)
//             ? { ...message, is_read: true } // 읽지 않은 메시지를 읽음 상태로 업데이트
//             : message // 기존 메시지 유지
//         )
//       );
//       } catch (error) {
//         console.error('Failed to mark messages as read:', error);
//       }
//     };

//     // 채팅방에 들어왔을 때 읽지 않은 메시지를 읽음 처리
//     markMessagesAsRead();
//   }, [messages, roomId]);


//   // Supabase Realtime 설정
//   useEffect(() => {
//     if (!roomId) return;

    

//     subscribeToMessages();
//   }, [roomId]);
  

//   useEffect(() => {
//     const checkAndCreateRoom = async () => {
//       if (!roomId || !user || !uid_1 || !uid_2) return;

//       try {
//         // 방 존재 여부 확인
//         const response = await fetch(`/api/chat/rooms?roomId=${roomId}`);
//         const data = await response.json();

//         // 방이 존재하지 않는다면 새로운 방 생성
//         if (!data.exists) {
//           const createRoomResponse = await fetch('/api/chat/rooms', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               roomId,
//               participants: [uid_1, uid_2], // 참가자 목록에 현재 유저 추가
//             }),
//           });

//           if (!createRoomResponse.ok) {
//             const errorData = await createRoomResponse.json();
//             console.error('Server error response:', errorData);
//             throw new Error(`Failed to create room: ${errorData.message}`);
//           }

//           console.log('Room created successfully');
//         } else {
//           console.log('Room already exists');

//           // 방이 이미 존재하면 채팅 목록 불러오기
//           const fetchMessages = async () => {
//             try {
//               const messageResponse = await fetch(`/api/chat/messages?roomId=${roomId}`);
//               const messageData = await messageResponse.json();
//               console.log(messageData)
//               if (messageResponse.ok) {
//                 setMessages(messageData); // 메시지 목록을 상태에 저장
//               } else {
//                 console.error('Failed to fetch messages:', messageData.error);
//               }
//             } catch (error) {
//               console.error('Error fetching messages:', error);
//             }
//           };

//           fetchMessages(); // 채팅 목록 가져오기
//         }
//       } catch (error) {
//         console.error('Error checking or creating room:', error);
//       }
//     };

//     checkAndCreateRoom();
//   }, [roomId, user, uid_1, uid_2]);



//   // // 메시지 전송 함수 (API 호출)
//   const handleMessageSend = async () => {
//     let imageUrl: (string | File)[] = [];
//     if(!user) return;

//     try{
//         if(image) {
//             imageUrl = await uploadImgGetUrl({picture:[image]});
//         }
//         const response = await fetch('/api/chat/sendMessage', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               content: newMessage,
//               imageUrl,
//               userUId: user.uid,
//               roomId
//             }),
//           });
//           const data = await response.json();

//       if (response.ok) {
//         // 새 메시지 객체에 Message 타입의 모든 필드를 포함시킴
//         // setMessages((prevMessages) => [
//         //     ...prevMessages,
//         //     {
//         //     id: data.messageId, // 서버에서 반환하는 메시지 ID
//         //     content: newMessage,
//         //     image_url: imageUrl[0], // 이미지 URL
//         //     users: {
//         //         profileImg: user.profileImg,
//         //         nickname: user.nickname,
//         //     },
//         //     created_at: new Date().toISOString(), // 추가 필드: 메시지 생성 시간
//         //     userId: user.uid, // 추가 필드: 사용자 ID
//         //     } as Message, // Message 타입을 명시적으로 선언
//         // ]);
//         setNewMessage('');
//         setImage(null); // 이미지 초기화
//       } else {
//         console.error(data.error);
//       }
//     }catch(error){
//         console.error(error);
//     }
//   };
//   // const handleMessageSend = async () => {

//   // }

//   return (
//     <div>
//       <h1>채팅</h1>
//       <div>
//         {messages.map((message) => (
//           <div key={message.id}>
//             <p>{message.content}</p>
//             {Array.isArray(message.image_url) && (
//               <img src={message.image_url} alt="uploaded" style={{ width: '200px' }} />
//             )}
//             <div>
//               <img src={message.users.profileImg} alt="profile" style={{ width: '50px', borderRadius: '50%' }} />
//               <span>{message.users.nickname}</span>
//             </div>
//             {message.is_read ? <span style={{ color: 'green' }}>읽음</span> : <span style={{ color: 'red' }}>안읽음</span>}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
//       <button type='button' onClick={handleMessageSend}>Send</button>
//     </div>
//   );
// }
