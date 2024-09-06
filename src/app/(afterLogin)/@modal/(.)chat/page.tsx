import ChatRoomList from '@/_features/chat/ui/ChatRoomList';
import ModalLayout from '@/_shared/ui/layout/server-modal-layout';

export default function SearchPage() {
  return (
    <ModalLayout>
      <ChatRoomList />
    </ModalLayout>
  );
}