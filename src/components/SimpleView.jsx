import { useState, useEffect } from 'react';
import { API_CONFIG, APP_CONFIG } from '../config.js';
import './SimpleView.css';

const SimpleView = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const config = {
    serverUrl: API_CONFIG.SERVER_URL,
    apiBasePath: API_CONFIG.API_BASE_PATH
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.serverUrl}${config.apiBasePath}/files`, {
        headers: {
          'X-Password': APP_CONFIG.DEFAULT_PASSWORD
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      setError('Failed to load files: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`${config.serverUrl}${config.apiBasePath}/upload`, {
        method: 'POST',
        headers: {
          'X-Password': APP_CONFIG.DEFAULT_PASSWORD
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      alert('File uploaded successfully!');
      setSelectedFile(null);
      fetchFiles();
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) {
      return;
    }

    try {
      const response = await fetch(`${config.serverUrl}${config.apiBasePath}/files/${encodeURIComponent(filename)}`, {
        method: 'DELETE',
        headers: {
          'X-Password': APP_CONFIG.DEFAULT_PASSWORD
        }
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      alert('File deleted successfully!');
      fetchFiles();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="simple-container">
        <h1>{APP_CONFIG.APP_NAME}</h1>
        <p>Loading files...</p>
      </div>
    );
  }

  return (
    <div className="simple-container">
      <h1>{APP_CONFIG.APP_NAME}</h1>
      
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="upload-section">
        <h2>Upload File</h2>
        <input 
          type="file" 
          onChange={handleFileSelect}
          disabled={uploading}
        />
        <button 
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="files-section">
        <h2>Files ({files.length})</h2>
        {files.length === 0 ? (
          <p>No files found.</p>
        ) : (
          <table className="files-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{formatFileSize(file.size)}</td>
                  <td>{formatDate(file.modified)}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(file.name)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="refresh-section">
        <button onClick={fetchFiles}>
          Refresh Files
        </button>
      </div>
    </div>
  );
};

export default SimpleView; 