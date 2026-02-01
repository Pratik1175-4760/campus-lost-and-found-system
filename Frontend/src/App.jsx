import { useState } from 'react';
import UploadForm from './components/upload/uploadForm.jsx';

function App() {
  // page controls which screen to show
  const [page, setPage] = useState('upload');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">🔍 Campus Lost & Found</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setPage('upload')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                page === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📸 Report Found
            </button>
            <button
              onClick={() => setPage('search')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                page === 'search'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🔍 Search
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {page === 'upload' && <UploadForm />}
      {page === 'search' && (
        <div className="text-center pt-20 text-gray-500">
          Search page coming soon...
        </div>
      )}
    </div>
  );
}

export default App;