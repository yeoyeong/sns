import { WriteForm } from '@/_features/write';
import ModalLayout from '@/_shared/ui/layout/server-modal-layout';

export default function WritePage() {
  return (
    <ModalLayout>
      <WriteForm />
    </ModalLayout>
  );
}