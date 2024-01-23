import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [imageFile, setImageFile] = useState(null); // Stocker le fichier lui-même
  const [fileName, setFileName] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    setFileName(file.name);
    setImageFile(file); // Stocker le fichier
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!imageFile) {
      console.error("Aucun fichier sélectionné");
      return;
    }

    try {
      // Obtenir l'URL présignée depuis l'API Gateway
      const presignedResponse = await axios.get(`https://x1mavx5ya0.execute-api.eu-west-3.amazonaws.com/Dev/upload?file_name=${fileName}`);
      const { url: presignedUrl } = presignedResponse.data;

      // Utiliser l'URL présignée pour l'upload
      await axios.put(presignedUrl, imageFile, {
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });
      
      console.log('Image téléchargée avec succès sur S3');
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’image', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Télécharger sur S3</button>
    </form>
  );
}

export default ImageUpload;
