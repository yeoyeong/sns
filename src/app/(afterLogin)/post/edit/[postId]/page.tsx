import EditForm from '@/_features/write/ui/editForm';
import BackButton from '@/_shared/ui/button/BackButton';

export default function EditPage() {
  return (
    <div className='bg-white-custom fixed top-0 z-20 flex h-screen w-full justify-center pt-20'>
      <div className='bg-white-100 flex h-[600px] w-[420px] flex-col'>
        <div className='pl-2 pt-4'>
          <BackButton />
        </div>
        <EditForm />
      </div>
    </div>
  );
}