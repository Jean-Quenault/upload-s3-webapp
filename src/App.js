import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    setFileName(file.name); // Stocker le nom du fichier
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result.split(',')[1]); // Supprime le préfixe base64
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('https://x1mavx5ya0.execute-api.eu-west-3.amazonaws.com/Dev/upload', image, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'file-name': fileName, // Inclure le nom du fichier dans les en-têtes
        }
      });
      console.log('Réponse de l’API:', response.data);
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
