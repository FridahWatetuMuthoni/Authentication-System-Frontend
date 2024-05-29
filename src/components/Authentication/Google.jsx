import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { googleRegister } from "../../queries/api";

function Google() {
  const clientID =
    "1085618487417-27lqrukr7qc7mg5vng7upj9er8ksjbe7.apps.googleusercontent.com";
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setUserID } = useGlobalContext();

  const mutation = useMutation({
    mutationFn: (payload) => googleRegister(payload),
    onSuccess: ({ data, variables, context }) => {
      console.log(`${context}--${variables}`);
      console.log(data);
      setRefreshToken(data?.refresh);
      setAccessToken(data?.access);
      localStorage.setItem("access_token", data?.access);
      localStorage.setItem("refresh_token", data?.refresh);
      localStorage.setItem("userID", data.user.pk);
      setUserID(data.user.pk);
      navigate("/");
    },
  });

  const handleReject = (error) => {
    console.log(error);
  };
  const handleSuccess = (response) => {
    const access = response?.data?.access_token;
    if (access) {
      const payload = {
        access_token: access,
      };
      mutation.mutateAsync(payload);
    }
  };
  return (
    <div className="w-full">
      <LoginSocialGoogle
        client_id={clientID}
        onResolve={handleSuccess}
        onReject={handleReject}
        isOnlyGetToken={true}
      >
        <GoogleLoginButton
          text="Sign up with Google"
          style={{
            fontSize: "12px",
            width: "100%",
            height: "40px",
          }}
        />
      </LoginSocialGoogle>
    </div>
  );
}

export default Google;
