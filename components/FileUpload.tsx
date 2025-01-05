'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, HTMLMotionProps } from 'framer-motion'

interface FileUploadProps {
  setFile: (file: File) => void
}

export default function FileUpload({ setFile }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [setFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  return (
    <motion.div
      {...(getRootProps() as HTMLMotionProps<'div'>)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 sm:p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 ${
        isDragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-sm sm:text-base text-gray-600">
        {isDragActive
          ? "Drop the file here..."
          : "Drag 'n' drop an image, or click to select"}
      </p>
    </motion.div>
  )
}