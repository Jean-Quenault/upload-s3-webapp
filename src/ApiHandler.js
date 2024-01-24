import React, { useState } from 'react';

function ApiHandler() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const getPresignedUrl = async (fileName) => {
    const response = await fetch('https://x1mavx5ya0.execute-api.eu-west-3.amazonaws.com/Dev/upload?file_name=' + fileName);
    const data = await response.json();
    console.log(data.url);
    return data.url;
  };

  const uploadFile = async () => {
    if (file) {
      try {
        const url = await getPresignedUrl(file.name);
        const result = await fetch(url, {
          method: 'PUT',
          body: file
        });
        if (!result.ok) {
          throw new Error('Erreur lors du téléversement du fichier');
        }
        console.log(await result.text());
      } catch (error) {
        console.error('Erreur lors du téléversement du fichier :', error);
      }
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