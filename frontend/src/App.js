import React, { useState } from 'react';
import axios from 'axios';
import { FiDownload, FiLoader } from 'react-icons/fi';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/download', { url }, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'video.mp4');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setLoading(false);
    } catch (error) {
      setError('Error downloading video');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">YouTube Video Downloader</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Download your favorite videos in MP4 format
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter YouTube URL"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleDownload}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={loading}
            >
              {loading ? <FiLoader className="animate-spin" /> : <FiDownload className="mr-2" />}
              {loading ? 'Downloading...' : 'Download'}
            </button>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
