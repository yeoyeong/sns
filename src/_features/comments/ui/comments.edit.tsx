import { useInput } from '@/_features/i/model';
import usePatchComments from '../model/query/usePatchComments';

type Props = {
  comment_content: string;
  comment_id: number;
  isEditMode: number | undefined;
  setIsEditMode: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export default function CommentsEdit({
  comment_content,
  comment_id,
  isEditMode,
  setIsEditMode,
}: Props) {
  const { values, handleChange } = useInput({
    content: comment_content ?? '',
  });
  const { createPostHandler } = usePatchComments();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!values.content.trim()) return;
    try {
      createPostHandler({ content: values.content, comment_id });
      setIsEditMode(undefined);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isEditMode === comment_id ? (
        <input
          type='text'
          name='content'
          value={values.content}
          onBlur={() => setIsEditMode(undefined)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p>{comment_content}</p>
      )}
    </div>
  );
}