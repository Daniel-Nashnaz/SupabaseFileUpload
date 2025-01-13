import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';

const GoogleAuth = () => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('שגיאת התחברות:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg flex items-center"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5 mr-2"
      />
      התחבר עם Google
    </button>
  );
};

export default GoogleAuth;