import axios from 'axios';

const {
  REACT_APP_SUNAPI_ENDPOINT,
  REACT_APP_SUNAPI_ENDPOINT_VERSION,
  REACT_APP_SUNAPI_TOKEN_NAME,
  REACT_APP_SUNAPI_USER,
  REACT_APP_SUNAPI_PASS,
} = process.env;

const instance = axios.create({
  baseURL: `${REACT_APP_SUNAPI_ENDPOINT}${REACT_APP_SUNAPI_ENDPOINT_VERSION}`,
});

instance.interceptors.request.use(async config => {
  // console.log('🚀 ~ instance.js ~ interceptors ~ request', { config });
  const token = window?.localStorage?.getItem?.(REACT_APP_SUNAPI_TOKEN_NAME) ?? '';
  if (!token?.length) {
    window?.localStorage?.removeItem?.(REACT_APP_SUNAPI_TOKEN_NAME);
    return config;
  }

  const { headers } = config;
  headers.Authorization = `Bearer ${token}`;

  return { ...config, headers };
});

instance.interceptors.response.use(async response => {
  // console.log('🚀 ~ instance.js ~ interceptors ~ response', { response });

  const { apiCode } = response.data;
  const originalRequest = response.config;

  if (['E_SIGNATURE_INVALID', 'E_EXPIRED_TOKEN'].includes(apiCode)) {
    let config;
    if (apiCode === 'E_SIGNATURE_INVALID') {
      config = {
        headers: {
          Authorization: null,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    }

    const responseLogin = await axios.post(
      `${REACT_APP_SUNAPI_ENDPOINT}/auth/login`,
      {
        username: REACT_APP_SUNAPI_USER,
        password: REACT_APP_SUNAPI_PASS,
      },
      config
    );

    const token = responseLogin.data.Bearer;
    if (token?.length) {
      window?.localStorage?.setItem?.(REACT_APP_SUNAPI_TOKEN_NAME, token);

      delete originalRequest.transformRequest;
      delete originalRequest.transformResponse;

      return instance(originalRequest);
    }
  }

  return response;
});

export default instance;
