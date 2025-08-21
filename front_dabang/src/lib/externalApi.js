import axios from "axios";

const externalApi = (config = {}) => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
  });

  instance.interceptors.request.use(
    (reqConfig) => {
      console.log(`요청 시작: ${reqConfig.url}`);
      return reqConfig;
    },
    (error) => {
      console.error("요청 인터셉터 에러:", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error("API 호출 에러:", error?.response?.data || error.message);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "서버 에러가 발생했습니다.";
        return Promise.reject(new Error(`[HTTP Error ${status}] ${message}`));
      } else if (error.request) {
        return Promise.reject(new Error("네트워크 연결에 실패했습니다."));
      } else {
        return Promise.reject(new Error("요청 설정에 문제가 있습니다."));
      }
    }
  );

  return instance;
};

export default externalApi;