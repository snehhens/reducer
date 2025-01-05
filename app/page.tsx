import Link from 'next/link'; // Import the Link component
import FileReducer from '@/components/FileReducer';

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-gradient-to-br from-purple-400 to-indigo-600">
      <div className="text-center mb-8 sm:mb-12">
        {/* Add the Link component here */}
      <Link
        href="https://myportfolio.ovrlzy.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
          Snehens
        </button>
      </Link><br></br><br></br>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">Image Reducer</h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Reduce your image size instantly in your browser. 
          We don&apos;t store any data - everything happens locally and securely on your device.
        </p>
      </div>

      <FileReducer />

      
    </main>
  );
}