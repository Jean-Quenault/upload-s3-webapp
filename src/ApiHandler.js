import React, { useState } from 'react';
import axios from 'axios';

function ApiHandler() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getPresignedUrl = async (fileName) => {
    // Remplacez par votre URL d'API Gateway
    const response = await axios.get('https://x1mavx5ya0.execute-api.eu-west-3.amazonaws.com/Dev/upload', {
      params: {
        file_name: fileName
      }
    });
    return response.data.url;
  };

  const uploadFile = async () => {
    if (file) {
      const url = await getPresignedUrl(file.name);
      await axios.put(url, file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Envoyer le fichier</button>
    </div>
  );
}

export default ApiHandler;