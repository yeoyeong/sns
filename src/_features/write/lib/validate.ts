export const writeImgValidate = {
  maxFiles: (value: FileList) =>
    value.length <= 3 || '최대 3개의 이미지만 업로드할 수 있습니다.',
  maxSize: (value: FileList) =>
    Array.from(value).every((file) => file.size <= 5 * 1024 * 1024) ||
    '각 파일의 크기는 최대 5MB까지 가능합니다.',
  acceptedFormats: (value: FileList) =>
    Array.from(value).every((file) =>
      ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)
    ) || '허용된 파일 형식은 JPG, JPEG, PNG입니다.',
};