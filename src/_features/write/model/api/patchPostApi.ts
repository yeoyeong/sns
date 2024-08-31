import { WritingFormData } from '../../lib/types/write';

export const patchPostApi = async (
  formData: WritingFormData,
  postId: string
) => {
  try {
    const response = await fetch('/api/post/patch', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        postId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.error}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return null;
  }
};