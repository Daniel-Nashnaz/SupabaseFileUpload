import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = "";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (event) => {
    try {
      setUploading(true);
      setError(null);

      const file = event.target.files[0];
      if (!file) {
        throw new Error("No file selected");
      }

      console.log("Starting upload...", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      const fileName = `${Date.now()}-${file.name}`;

      console.log("Uploading to Supabase...", {
        bucket: "kosher_certificates",
        fileName: fileName,
      });

      const { data, error: uploadError } = await supabase.storage
        .from("kosher_certificates")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      console.log("File uploaded successfully", data);

      const {
        data: { publicUrl },
        error: urlError,
      } = supabase.storage.from("kosher_certificates").getPublicUrl(fileName);

      if (urlError) {
        console.error("Error fetching URL:", urlError);
        throw urlError;
      }

      console.log("Public URL received:", publicUrl);
      setImageUrl(publicUrl);
    } catch (error) {
      console.error("Detailed error:", error);
      setError(error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Upload Kosher Certificate</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={uploadImage}
          disabled={uploading}
        />
      </div>

      {uploading && <div style={{ color: "blue" }}>Uploading file...</div>}

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>
      )}

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ color: "green", marginBottom: "10px" }}>
            File uploaded successfully!
          </div>

          {imageUrl.toLowerCase().endsWith(".pdf") ? (
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Click here to view the PDF file
            </a>
          ) : (
            <img
              src={imageUrl}
              alt="Kosher certificate"
              style={{ maxWidth: "100%" }}
            />
          )}

          <div
            style={{
              marginTop: "10px",
              wordBreak: "break-all",
              fontSize: "12px",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            URL: {imageUrl}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
