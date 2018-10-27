import axios from 'axios';
const Authenticater = {
  get: async (url, headers) => {
    const authToken = localStorage.getItem('Authorization');
    headers = {
      ...headers,
      Authorization: `Bearer ${authToken}`,
    };
    let response = await axios.get(`${url}`, { headers }).catch((ex) => {
      console.log(ex);
      throw new Error(`Authentication: ${ex}`);
    });

    return response;
  },

  post: async (url, body, headers) => {
    const authToken = localStorage.getItem('Authorization');
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
    let response = await axios.post(`${url}`, body, { headers }).catch((ex) => {
      console.log(ex);
      throw new Error(`Authenticator: ${ex}`);
    });

    return response;
  },
  put: async (url, body, headers) => {
    const authToken = localStorage.getItem('Authorization');
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
    let response = await axios.put(`${url}`, body, { headers }).catch((ex) => {
      console.log(ex);
      throw new Error(`Authenticator: ${ex}`);
    });

    return response;
  },
  delete: async (url, headers) => {
    const authToken = localStorage.getItem('Authorization');
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
    console.log(headers);
    let response = await axios.delete(`${url}`, { headers }).catch((ex) => {
      console.log(ex);
      throw new Error(`Authenticator: ${ex}`);
    });

    return response;
  },
};

export default Authenticater;
