import React, { useState } from 'react';
//import firebase from 'firebase/app';
//import { getStorage, ref } from "firebase/storage";
//import 'firebase/firestore';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // Upload the file to Cloud Storage using the Firebase SDK
    const storageRef = firebase.storage().ref('resumes');
    await storageRef.put(file);

    // Extract text from the uploaded file using the Cloud Vision API
    const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY', {
      method: 'POST',
      body: JSON.stringify({
        requests: [{
          image: {
            content: await file.arrayBuffer(),
          },
          features: [{
            type: 'DOCUMENT_TEXT_DETECTION',
          }],
        }],
      }),
    });
    const text = await response.json().responses[0].fullTextAnnotation.text;

    // Send the extracted text to the backend for processing
    fetch('/api/process-resume', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload Resume</button>
    </div>
  );
};

export default ResumeUploader;