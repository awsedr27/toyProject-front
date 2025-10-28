import { useApi } from '@/hooks/useApi';
// 파일 업로드 유틸 함수
export const fileUpload = async (file) => {
    const { post } = useApi();
  try {
    const formData = new FormData();
    formData.append('file', file);

    // multipart/form-data는 axios가 자동으로 Content-Type을 지정하므로
    // 명시적으로 넣지 않아도 됨 (하지만 명시해도 문제는 없음)
    const res = await post(
      '/api/file/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
      true // 로딩바 켜기 등 custom 옵션
    );

    console.log('업로드 결과:', res.data.fileId);
    return res.data.fileId;

  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw error; // 필요 시 상위에서 처리하도록 던짐
  }
};
