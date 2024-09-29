import { useState, useRef } from "react";
import { addRecipeImage } from "../../utils/apiUtils";
import "./UploadRecipeImage.scss";

export default function UploadRecipeImage({ id, fetchRecipeData }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [formValidation, setFormValidation] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFormValidation("");
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await addRecipeImage(id, formData);
      setFormValidation("");
      fetchRecipeData();
      setFile(null);
      fileInputRef.current.value = null;
    } else {
      setFormValidation("Please select an image to upload");
    }
  };

  return (
    <div className="upload">
      <label htmlFor="imageUpload" className="upload__select">
        Select your own Image
        <input
          id="imageUpload"
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </label>
      {file && (
        <button
          className="upload__send"
          disabled={!file}
          onClick={handleUpload}
        >
          Upload {fileName}
        </button>
      )}
      <p>{formValidation}</p>
    </div>
  );
}
