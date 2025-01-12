import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import "./App.css";

const supabaseUrl = "";
const supabaseKey = "";

let supabase = null;

if (
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl !== "YOUR_SUPABASE_URL" &&
  supabaseKey !== "YOUR_SUPABASE_ANON_KEY"
) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="app-container">
      <h1>Upload Kosher Certificate</h1>

      <div className="upload-input-container">
        <input type="file" accept="image/*,.pdf" onChange={uploadImage} disabled={uploading} />
      </div>

      {uploading && <div className="uploading-message">Uploading file...</div>}

      {error && <div className="error-message">Error: {error}</div>}

      {imageUrl && (
        <div className="image-preview-container">
          <div className="success-message">File uploaded successfully!</div>
          {imageUrl.toLowerCase().endsWith(".pdf") ? (
            <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="pdf-link">
              Click here to view the PDF file
            </a>
          ) : (
            <img src={imageUrl} alt="Kosher certificate" className="uploaded-image" />
          )}

          <div className="image-url-container">URL: {imageUrl}</div>
        </div>
      )}
    </div>
  );
}

export default App;
