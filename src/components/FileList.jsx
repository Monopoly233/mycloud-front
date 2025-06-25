import React from 'react';
import FileCard from './FileCard';
import './FileList.css';

const FileList = ({ files, loading, onDownload, onDelete, onPreview, onRefresh }) => {
  return (
    <div className="file-list-container">
      <div className="content-header">
        <h2>File List</h2>
        <button 
          className="btn btn-outline"
          onClick={onRefresh}
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      
      {files.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3>No Files</h3>
          <p>Click "Upload File" button to get started</p>
        </div>
      ) : (
        <div className="file-grid">
          {files.map((file, index) => (
            <FileCard
              key={index}
              file={file}
              onDownload={onDownload}
              onDelete={onDelete}
              onPreview={onPreview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList; 