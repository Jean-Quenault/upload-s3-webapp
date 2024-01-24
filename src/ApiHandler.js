import React, { useState } from 'react';

function ApiHandler() {
  const [file, setFile] = useState(null);

  // This function is triggered when a file is selected
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  // This function gets a presigned URL for uploading a file
  const getPresignedUrl = async (fileName) => {
    const response = await fetch('https://x1mavx5ya0.execute-api.eu-west-3.amazonaws.com/Dev/upload?file_name=' + fileName);
    const data = await response.json();
    console.log(data.url);
    return data.url;
  };

  // This function uploads the file to the presigned URL
  const uploadFile = async () => {
    if (file) {
      try {
        const url = await getPresignedUrl(file.name);
        const result = await fetch(url, {
          method: 'PUT',
          body: file
        });
        if (!result.ok) {
          throw new Error('An error occurred while uploading the file');
        }
        console.log(await result.text());
        window.alert('The file has been uploaded successfully!');
      } catch (error) {
        console.error('An error occurred while uploading the file', error);
        window.alert('An error occurred while uploading the file');
      }
    }
  };

  // The component renders a file input and a button for uploading the file
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Envoyer le fichier</button>
    </div>
  );
}

export default ApiHandler;