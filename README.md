# Supabase File Upload System with Google Authentication

A React application that demonstrates file upload functionality using Supabase Storage and Google Authentication. This system allows users to log in with their Google account, upload files (images and PDFs), and get public URLs for the uploaded files.

## 🚀 Features

- Google Authentication for user login
- File upload to Supabase Storage
- Support for images and PDF files
- Real-time upload status
- Public URL generation for uploaded files
- Error handling and validation
- Responsive UI

## ⚙️ Supabase Setup

1. Create a Supabase project
2. Create a new bucket in Supabase Storage
3. Get your Supabase URL and anon key


## 🔐 Setup Google Authentication

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. Choose "Web application" as the application type
6. Add your app's URL to the "Authorized JavaScript origins" and "Authorized redirect URIs"
7. Copy the Client ID and Client Secret
8. In your Supabase project, go to "Authentication" > "Providers"
9. Enable Google Auth and paste your Client ID and Client Secret

## 🛠️ Installation

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd supabase-upload`
3. Install dependencies: `npm install` or `yarn install`
4. Create a `.env` file in the root directory and add the following:

\`\`\`env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
\`\`\`

## 📁 Project Structure

\`\`\`
supabase-upload/
├── src/
│   ├── components/
│   │   ├── GoogleAuth.tsx    # Google authentication component
│   │   ├── LoginPage.tsx     # Login page component
│   │   └── UploadPage.tsx    # File upload component
│   ├── config/
│   │   ├── firebase.ts       # Firebase configuration
│   │   └── supabase.ts       # Supabase configuration
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Entry point
├── index.html                # HTML template
├── package.json              # Project dependencies
└── README.md                 # Project documentation
\`\`\`

## 💻 Usage

1. Open the application in your browser
2. Click the "Log in with Google" button to authenticate
3. Once logged in, you'll see the file upload interface
4. Click the file input button to select a file
5. Choose an image or PDF file
6. The file will automatically upload to Supabase Storage
7. Once uploaded, you'll see the file preview (for images) or a link (for PDFs)
8. The public URL will be displayed below the preview
9. You can log out using the "Logout" button

## 🔑 Environment Variables

The following environment variables are required:

\`\`\`env
# Supabase
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Firebase
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
\`\`\`

Make sure to add these variables to your `.env` file in the root directory of your project.

## 🛡️ Security Considerations

- Google Authentication is used for user login
- The storage bucket is configured with public access
- Files are given unique names using timestamps
- Supabase handles authentication and file storage
- File types are restricted to images and PDFs
- User sessions are managed securely through Firebase Authentication


## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the storage solution
- [Firebase](https://firebase.google.com) for authentication
- [React](https://reactjs.org) for the frontend framework
- [Vite](https://vitejs.dev) for the build tool

## 📧 Support

For support, please open an issue in the repository or contact [daniel.81953@gmail.com].
