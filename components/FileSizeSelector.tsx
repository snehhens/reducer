'use client'

import { motion } from 'framer-motion'

interface FileSizeSelectorProps {
  targetSize: number
  setTargetSize: (size: number) => void
}

export default function FileSizeSelector({ targetSize, setTargetSize }: FileSizeSelectorProps) {
  const sizes = [
    { label: '25 %', value: 512 * 1024 },
    { label: '50%', value: 1024 * 1024 },
    { label: '75%', value: 2 * 1024 * 1024 },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Select target file size:</h2>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        {sizes.map((size) => (
          <motion.button
            key={size.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTargetSize(size.value)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base ${
              targetSize === size.value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {size.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}