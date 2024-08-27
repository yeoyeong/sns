import { WritingFormData } from '../../lib/types/write';

export const createPostApi = async (formData: WritingFormData) => {
  try {
    const response = await fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
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