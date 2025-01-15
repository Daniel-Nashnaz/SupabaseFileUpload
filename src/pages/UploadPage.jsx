import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { supabase } from "../config/supabase";

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  if (!supabase) {
    return (
      <div className="error-container">
        <h1>Supabase Configuration Error</h1>
        <p>
          Please ensure <strong>SUPABASE_URL</strong> and <strong>SUPABASE_ANON_KEY</strong> are correctly set
          in your environment.
        </p>
        <p>Update these values and reload the page to continue.</p>
      </div>
    );
  }

  const uploadImage = async (event) => {
    try {
      setUploading(true);
      setError(null);

      const file = event.target.files[0];
      if (!file) {
        throw new Error("No file selected");
      }

      setFileName(file.name);

      const fileName = `${Date.now()}-${file.name}`;

      const { data, error: uploadError } = await supabase.storage
        .from("kosher_certificates")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicData, error: urlError } = supabase.storage
        .from("kosher_certificates")
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      setImageUrl(publicData.publicUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-header">
        <h1>Upload Kosher Certificate</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="upload-container">
        <div className="file-input-container">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={uploadImage}
            disabled={uploading}
            className="file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="file-input-label">
            {fileName ? fileName : "Choose a file to upload"}
          </label>
        </div>

        {uploading && <div className="uploading-message pulse">Uploading file...</div>}

        {error && <div className="error-message">Error: {error}</div>}

        {imageUrl && (
          <div className="preview-container">
            <div className="success-message">File uploaded successfully!</div>
            {imageUrl.toLowerCase().endsWith(".pdf") ? (
              <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="pdf-link">
                Click here to view the PDF file
              </a>
            ) : (
              <img src={imageUrl || "/placeholder.svg"} alt="Kosher certificate" className="uploaded-image" />
            )}

            <div className="image-url">URL: {imageUrl}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
