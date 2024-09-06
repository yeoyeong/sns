import crypto from 'crypto';

/**
 * 두 사용자의 userId를 사용해 고유한 roomId를 생성하는 함수
 * @param userId1 첫 번째 사용자의 ID
 * @param userId2 두 번째 사용자의 ID
 * @returns 생성된 고유한 roomId
 */
export function generateRoomId(userId1: string, userId2: string): string {
  // 두 사용자의 userId를 사전순으로 정렬하여 일관된 결과를 보장
  const sortedIds = [userId1, userId2].sort();
  
  // 정렬된 두 userId를 결합하여 하나의 문자열로 만든 후, SHA-256 해시 생성
  const hash = crypto.createHash('sha256').update(`${sortedIds[0]}-${sortedIds[1]}`).digest('hex');
  
  return hash;
}
