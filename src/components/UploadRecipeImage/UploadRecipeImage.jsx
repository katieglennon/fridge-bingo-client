import { useState, useRef } from "react";
import { addRecipeImage } from "../../utils/apiUtils";

export default function UploadRecipeImage({ id, fetchRecipeData }) {
  const [file, setFile] = useState(null);
  const [formValidation, setFormValidation] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    <div>
      <input type="file" onChange={handleFileChange} ref={fileInputRef} />
      <button onClick={handleUpload}>Upload</button>
      <p>{formValidation}</p>
    </div>
  );
}
