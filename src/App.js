import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [image, setImage] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result.split(',')[1]); // Supprime le préfixe base64 ici
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('https://x1mavx5ya0.execute-api.eu-west-3.amazonaws.com/Dev/send', {
        image: image // Utilisez l'image déjà transformée
      });
      const downloadUrl = response.data.download_url;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’image', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Convertir et Télécharger</button>
    </form>
  );
}

export default ImageUpload;
