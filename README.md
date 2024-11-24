# Supabase File Upload System

A simple React application that demonstrates file upload functionality using Supabase Storage. This system allows users to upload files (images and PDFs) and get public URLs for the uploaded files.

## 🚀 Features

- File upload to Supabase Storage
- Support for images and PDF files
- Real-time upload status
- Public URL generation for uploaded files
- Error handling and validation
- Responsive UI

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js installed (version 14 or higher)
- A Supabase account and project created
- Git installed (for cloning the repository)

## ⚙️ Setup Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your project, navigate to `Storage` and create a new bucket named `kosher_certificates`
3. Go to `Storage -> Policies` and create a new policy with the following SQL:

```sql
CREATE POLICY "public_policy" ON storage.objects FOR ALL USING (
    bucket_id = 'kosher_certificates'
) WITH CHECK (
    bucket_id = 'kosher_certificates'
);
```

4. Get your project URL and anon key from `Settings -> API`

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/supabase-upload.git
cd supabase-upload
```

2. Install dependencies:

```bash
npm install
```

3. Add a key in App.jsx

```key
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
```

4. Replace the environment variables with your Supabase project credentials

## 🚀 Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
supabase-upload/
├── src/
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point
├── index.html         # HTML template
├── package.json       # Project dependencies
└── README.md         # Project documentation
```

## 💻 Usage

1. Click the file input button to select a file
2. Choose an image or PDF file
3. The file will automatically upload to Supabase Storage
4. Once uploaded, you'll see the file preview (for images) or a link (for PDFs)
5. The public URL will be displayed below the preview

## ⚠️ Error Handling

The application includes error handling for:

- File selection errors
- Upload failures
- Network issues
- Authorization errors

Error messages will be displayed in the UI and logged to the console.

## 🔑 Environment Variables

The following environment variables are required:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🛡️ Security Considerations

- The storage bucket is configured with public access
- Files are given unique names using timestamps
- Supabase handles authentication and file storage
- File types are restricted to images and PDFs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the storage solution
- [React](https://reactjs.org) for the frontend framework
- [Vite](https://vitejs.dev) for the build tool

## 📧 Support

For support, please open an issue in the repository or contact [daniel.81953@gmail.com].
