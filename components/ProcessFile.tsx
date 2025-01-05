'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProcessFileProps {
  file: File;
  targetSize: number;
  setFile: (file: File | null) => void;
}

export default function ProcessFile({ file, targetSize, setFile }: ProcessFileProps) {
  const [processing, setProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);

  const processFile = async () => {
    setProcessing(true);

    try {
      if (file.type.startsWith('image/')) {
        await processImage();
      } else {
        alert('Unsupported file type. Please upload an image.');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('An error occurred while processing the file. Please try again.');
    }

    setProcessing(false);
  };

  const processImage = async () => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    let quality = 0.9;
    let blob: Blob | null = null;

    do {
      const scaleFactor = Math.sqrt(targetSize / file.size);
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/jpeg', quality)
      );

      quality -= 0.05;
    } while (blob && blob.size > targetSize && quality > 0.1);

    if (blob) {
      setProcessedFile(blob);
    }
  };

  const downloadFile = () => {
    if (processedFile) {
      const url = URL.createObjectURL(processedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reduced_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <p className="mb-4 text-sm sm:text-base">
        File: <span className="font-semibold">{file.name}</span> ({(file.size / 1024 / 1024).toFixed(2)} MB)
      </p>
      {!processedFile ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={processFile}
          disabled={processing}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-sm sm:text-base"
        >
          {processing ? 'Processing...' : 'Process File'}
        </motion.button>
      ) : (
        <div>
          <p className="mb-4 text-sm sm:text-base">
            Reduced file size: {(processedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadFile}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm sm:text-base"
          >
            Download Reduced File
          </motion.button>
        </div>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setFile(null)}
        className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm sm:text-base"
      >
        Upload Another File
      </motion.button>
    </div>
  );
}