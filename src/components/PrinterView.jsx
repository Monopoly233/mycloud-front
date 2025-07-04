import { useState, useEffect } from 'react';
import { API_CONFIG, APP_CONFIG } from '../config.js';
import './PrinterView.css';

const PrinterView = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      <div className="printer-container">
        <h1>{APP_CONFIG.APP_NAME}</h1>
        <p>Loading files...</p>
      </div>
    );
  }

  return (
    <div className="printer-container">
      <h1>{APP_CONFIG.APP_NAME}</h1>
      
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

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
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{formatFileSize(file.size)}</td>
                  <td>{formatDate(file.modified)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="info-section">
        <p>Generated on: {new Date().toLocaleString()}</p>
        <p>Total files: {files.length}</p>
      </div>
    </div>
  );
};

export default PrinterView; 