import EditForm from '@/_features/write/ui/editForm';
import ModalLayout from '@/_shared/ui/layout/server-modal-layout';

export default function WritePage() {
  return (
    <ModalLayout>
      <EditForm />
    </ModalLayout>
  );
}