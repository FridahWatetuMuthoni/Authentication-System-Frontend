import axiosInstance from "../api/axiosInstance";
import useGlobalContext from "./useGlobalContext";

const useRefreshToken = () => {
  const { setAccessToken } = useGlobalContext();
  const refresh = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    if (refresh_token) {
      console.log(`useRefresh hook-in if statement------>${refresh_token}`);
      const tokenParts = JSON.parse(atob(refresh_token.split(".")[1]));

      // expiry date in token is expressed in seconds, while now() returns in miliseconds
      const now = Math.ceil(Date.now() / 1000);

      if (tokenParts.exp > now) {
        try {
          const response = await axiosInstance.post("refresh/", {
            refresh: refresh_token,
          });
          console.log(response?.data);
          localStorage.setItem("access_token", response?.data?.access);
          setAccessToken(response?.data?.access);
          return response?.data?.access;
        } catch (error) {
          console.log(error);
        }
      } else {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
