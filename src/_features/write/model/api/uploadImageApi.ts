export const uploadImg = async (
  image: File,
  bucketName: string
): Promise<string | null> => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('bucketName', bucketName);

  const response = await fetch('/api/post/upload-img', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (response.ok && data.imageUrl) {
    return data.imageUrl;
  }

  console.error(`Failed to upload image: ${data.error || 'Unknown error'}`);
  return null;
};