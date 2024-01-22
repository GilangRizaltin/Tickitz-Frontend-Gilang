import axios from "axios";

export const getOrderHistory = (query, jwt) => {
  const getOrderHistoryUrl =
    import.meta.env.VITE_BACKEND_HOST + "/order?" + query;
  return axios.get(getOrderHistoryUrl, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
};
