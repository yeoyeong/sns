const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export function validateFiles(files: File[]): File[] {
  return files.filter((file) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(
        `파일 ${file.name}은(는) 너무 큽니다. 5MB 이하의 파일만 업로드할 수 있습니다.`
      );
      return false;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(
        `파일 ${file.name}은(는) 허용되지 않는 파일 형식입니다. JPEG 또는 PNG 파일만 업로드할 수 있습니다.`
      );
      return false;
    }
    return true;
  });
}