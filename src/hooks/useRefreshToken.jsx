import useGlobalContext from "./useGlobalContext";
import { useAccessToken } from "../queries/mutations";

function useRefreshToken() {
  const { refresh_token, setAccessToken, setRefreshToken } = useGlobalContext();
  const getAccess = useAccessToken();

  const refresh = async () => {
    if (refresh_token) {
      const tokenParts = JSON.parse(atob(refresh_token.split(".")[1]));

      // expiry date in token is expressed in seconds, while now() returns in miliseconds
      const now = Math.ceil(Date.now() / 1000);

      if (tokenParts.exp > now) {
        const response = getAccess.mutate(refresh_token);
        console.log(response);
        // setAccessToken()
      } else {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        setAccessToken(null);
        setRefreshToken(null);
      }
    }
  };

  return refresh;
}

export default useRefreshToken;
