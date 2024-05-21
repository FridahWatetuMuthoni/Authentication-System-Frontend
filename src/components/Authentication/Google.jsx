import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

function Google() {
  const clientID =
    "1085618487417-27lqrukr7qc7mg5vng7upj9er8ksjbe7.apps.googleusercontent.com";

  const handleReject = (error) => {
    console.log(error);
  };
  const handleSuccess = (response) => {
    console.log(response);
    console.log(response.data);
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
