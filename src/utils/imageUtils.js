/**
 * 파일을 Base64 문자열로 변환
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * 파일 입력 이벤트에서 Base64로 변환
 */
export const handleFileChange = async (file) => {
  if (!file) return null;
  return await fileToBase64(file);
};
