import React, { useState } from 'react';

function UploadImageToS3() {
  const [image, setImage] = useState(null);

  const handleFileInput = (e) => {
    setImage(e.target.files[0]);
  }

  const uploadFile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const base64 = e.target.result.split(',')[1];

      const data = {
        fileName: file.name,
        fileContent: base64,
        contentType: file.type
      };

      try {
        const response = await fetch('URL_DE_VOTRE_API', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
      }
    };
  }

  return (
    <div>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => uploadFile(image)}>Upload to S3</button>
    </div>
  );
}

export default UploadImageToS3;
