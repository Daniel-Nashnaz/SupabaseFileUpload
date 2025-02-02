import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

const GoogleAuth = () => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      console.log("User's idToken:", idToken);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button onClick={handleLogin} className="google-auth-button">
      <img src="https://www.google.com/favicon.ico" alt="Google" className="google-icon" />
      Log in with Google
    </button>
  );
};

export default GoogleAuth;
