import { useNavigate } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import { useLogout } from "../../queries/mutations";

function Logout() {
  const navigate = useNavigate();
  const logoutUser = useLogout();
  const { refresh_token, setAccessToken, setRefreshToken } = useGlobalContext();

  useEffect(() => {
    const logout = async () => {
      if (refresh_token) {
        try {
          const response = await logoutUser.mutateAsync(refresh_token);
          console.log(response);
          setAccessToken(null);
          setRefreshToken(null);
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_id");
          navigate("/login/");
        } catch (err) {
          console.log(err);
        }
      }
    };
    logout();
  }, [refresh_token, setAccessToken, setRefreshToken, navigate, logoutUser]);
  return <div>You have logged out of your account</div>;
}

export default Logout;
