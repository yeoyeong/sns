'use client';

import supabase from '@/supabaseClient';
import { useState } from 'react';

export default function UploadImage() {
    const [image, setImage] = useState<File|null>();
    const [imageUrl, setImageUrl] = useState<string>('');
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

//   const handleUpload = async () => {
//     if (!image) {
//       alert('Please select an image to upload.');
//       return;
//     }
  
//     const fileExt = image.name.split('.').pop();
//     const fileName = `${Math.random()}.${fileExt}`;
//     const filePath = `${fileName}`;
  
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from('profile_img') // 여기에 실제 버킷 이름을 입력합니다.
//       .upload(filePath, image);
  
//     if (uploadError) {
//       console.error('Error uploading file:', uploadError.message);
//       return;
//     }
  
//     const { data: publicUrlData, error: urlError } = supabase.storage
//       .from('profile_img') // 여기에 실제 버킷 이름을 입력합니다.
//       .getPublicUrl(filePath);
  
//     if (urlError) {
//       console.error('Error getting public URL:', urlError.message);
//       return;
//     }
  
//     setImageUrl(publicUrlData.publicUrl);
//   };
  
const getProfileImgURL = (BUCKETNAME:string, filePath:string): string | null => {
        const { data } = supabase.storage
        .from(BUCKETNAME) // 여기에 실제 버킷 이름을 입력합니다.
        .getPublicUrl(filePath);
    
        if (!data || !data.publicUrl) {
            console.error('Error getting public URL.');
            return null;
        }
        return data.publicUrl;
    }

    const handleUpload = async () => {
        const BUCKETNAME = 'profile_img'
        if (!image) {
            // TODO: 기본이미지 처리
            return;
        }
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(BUCKETNAME) // 여기에 실제 버킷 이름을 입력합니다.
            .upload(filePath, image);
        
        // 업로드 후 에러가 있는지 확인
        if (uploadError) {
            console.error('Error uploading file:', uploadError.message);
            return;
        }
        const publicUrl = getProfileImgURL(BUCKETNAME, filePath);
            if (publicUrl) {
                setImageUrl(publicUrl);
            }
    }



  return (
    <div>
      <h1>Upload Image</h1>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={imageUrl} target='_blank' rel='noopener noreferrer'>
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
}