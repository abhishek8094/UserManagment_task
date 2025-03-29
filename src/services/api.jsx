import axios from "axios";

const BASE_URL = "https://reqres.in/";

export const setToken = (token) => {
  if (token) {
    Cookies.set('token', token, {
      expires: 7,
      secure: true,
      sameSite: 'Strict',
    })
  }
}

export const getToken = () => {
  const token = Cookies.get('token')
  return token ? token : null
}


export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (endpoint, data) => {
  try {
    const response = await axios.put(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
