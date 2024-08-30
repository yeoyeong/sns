import { ProfileSetup } from '@/_features/i/lib/types/user';

export const patchPostApi = async (formData: ProfileSetup) => {
  console.log(formData);
  try {
    const response = await fetch('/api/auth/patch', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.error}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    throw error;
  }
};