'use client';

import React from 'react';
import ResumeUploader from '@/app/components/ResumeUploader';
//import { getStorage, ref } from "firebase/storage";


function HomePage() {
  return (
    <div>
      <h1>Job Matcher</h1>
      <p>Upload your resume to find the perfect job for you.</p>
      <ResumeUploader />
    </div>
  );
}

export default HomePage;