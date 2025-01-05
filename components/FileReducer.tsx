'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FileUpload from './FileUpload'
import FileSizeSelector from './FileSizeSelector'
import ProcessFile from './ProcessFile'

export default function FileReducer() {
  const [file, setFile] = useState<File | null>(null)
  const [targetSize, setTargetSize] = useState<number>(1024 * 1024) // 1MB default

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-xl p-4 sm:p-8 w-full max-w-md"
    >
      {!file ? (
        <FileUpload setFile={setFile} />
      ) : (
        <>
          <FileSizeSelector targetSize={targetSize} setTargetSize={setTargetSize} />
          <ProcessFile file={file} targetSize={targetSize} setFile={setFile} />
        </>
      )}
    </motion.div>
  )
}