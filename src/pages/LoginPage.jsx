import GoogleAuth from "../components/GoogleAuth";

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1 className="login-title">Welcome! Please log in to continue</h1>
      <GoogleAuth />
    </div>
  );
};

export default LoginPage;
