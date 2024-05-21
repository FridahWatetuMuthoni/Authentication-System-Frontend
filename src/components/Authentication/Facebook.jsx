import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useCallback } from "react";

function Facebook() {
  const appId = "304717439171510";

  const handleSuccess = (response) => {
    console.log(response);
    console.log(response.data);
  };
  const handleReject = (error) => {
    console.log(error);
  };
  const LoginStart = useCallback(() => {
    alert("login start");
  }, []);

  return (
    <div className="w-full">
      <LoginSocialFacebook
        appId={appId}
        onResolve={handleSuccess}
        onReject={handleReject}
        onLoginStart={LoginStart}
        isOnlyGetToken={true}
      >
        <FacebookLoginButton
          text="Sign up with Facebook"
          className="rounded text-sm"
          style={{
            fontSize: "12px",
            width: "100%",
            height: "40px",
          }}
        />
      </LoginSocialFacebook>
    </div>
  );
}

export default Facebook;
