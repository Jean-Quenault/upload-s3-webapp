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
    const response = await fetch(`${process.env.REACT_APP_API_URL}upload?file_name=${fileName}`);    
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ marginBottom: '50px' }}>Webapp to upload file on private S3</h1>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: '20px' }} />
      <button onClick={uploadFile} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Envoyer le fichier</button>
    </div>
  );
}

export default ApiHandler;