import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import GoogleAuth from '../components/GoogleAuth';
import UploadPage from './UploadPage';

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>טוען...</div>;
  }

  if (user) {
    return <UploadPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-8">ברוך הבא! אנא התחבר כדי להמשיך</h1>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default LoginPage;