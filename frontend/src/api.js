import axios from "axios";
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_ENDPOINT,
});

apiClient.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await apiClient.get(`/product?page=${pageParam}`);

  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await apiClient.get(`/product/${id}`);

  return data;
};

export const postProduct = async (input) => {
  const { data } = await apiClient.post(`/product/`, input);

  return data;
};

export const fetcRegister = async (input) => {
  const { data } = await apiClient.post(`/auth/register`, input);

  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await apiClient.post(`/auth/login`, input);

  return data;
};

export const fetchMe = async () => {
  const { data } = await apiClient.get(`/auth/me`);
  return data;
};

export const fetchLogout = async () => {
  const { data } = await apiClient.post(`/auth/logout`, {
    refresh_token: localStorage.getItem("refresh-token"),
  });
  return data;
};

export const postOrder = async (input) => {
  const { data } = await apiClient.post(`/order`, input);
  return data;
};

export const fetchOrders = async () => {
  const { data } = await apiClient.get(`/order`);
  return data;
};

export const deleteProduct = async (product_id) => {
  const { data } = await apiClient.delete(`/product/${product_id}`);

  return data;
};

export const updateProduct = async (input, product_id) => {
  const { data } = await apiClient.put(`/product/${product_id}`, input);

  return data;
};
