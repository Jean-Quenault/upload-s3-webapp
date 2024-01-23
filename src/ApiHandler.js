import React, { useState } from 'react';
import axios from 'axios';

const ApiHandler = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadStatus('');
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    try {
      // Obtention de l'URL présignée
      const presignedResponse = await axios.get(`https://x1mavx5ya0.execute-api.eu-west-3.amazonaws.com/Dev/upload`, {
        params: { file_name: file.name }
      });

      const presignedUrl = presignedResponse.data.url;

      // Envoi du fichier à l'URL présignée
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type
        }
      });

      setUploadStatus('Fichier envoyé avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
      setUploadStatus('Erreur lors de l\'envoi du fichier.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Envoyer le fichier</button>
      {uploadStatus && <div>{uploadStatus}</div>}
    </div>
  );
};

export default ApiHandler;
