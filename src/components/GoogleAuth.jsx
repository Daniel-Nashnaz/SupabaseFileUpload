import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      console.log('התחברת בהצלחה:', result.user);
    } catch (error) {
      console.error('שגיאת התחברות:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('התנתקת בהצלחה');
    } catch (error) {
      console.error('שגיאת התנתקות:', error);
    }
  };

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
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
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={user.photoURL}
            alt="תמונת פרופיל"
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-center">{user.displayName}</p>
          <p className="text-gray-600 text-center mb-4">{user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            התנתק
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;