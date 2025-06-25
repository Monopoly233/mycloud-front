import React from 'react';
import FileCard from './FileCard';
import './FileList.css';

const FileList = ({ files, loading, onDownload, onDelete, onRefresh }) => {
  return (
    <div className="file-list-container">
      <div className="content-header">
        <h2>文件列表</h2>
        <button 
          className="btn btn-outline"
          onClick={onRefresh}
          disabled={loading}
        >
          🔄 刷新
        </button>
      </div>

      {loading && <div className="loading">加载中...</div>}
      
      {files.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3>暂无文件</h3>
          <p>点击"上传文件"按钮开始使用</p>
        </div>
      ) : (
        <div className="file-grid">
          {files.map((file, index) => (
            <FileCard
              key={index}
              file={file}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList; 