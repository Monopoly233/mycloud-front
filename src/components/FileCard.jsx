import React from 'react';
import { FILE_CONFIG } from '../config';
import './FileCard.css';

const FileCard = ({ file, onDownload, onDelete }) => {
  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 格式化时间
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US');
  };

  // 获取文件图标
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return FILE_CONFIG.FILE_ICONS[ext] || FILE_CONFIG.FILE_ICONS.default;
  };

  return (
    <div className="file-card">
      <div className="file-icon">{getFileIcon(file.name)}</div>
      <div className="file-info">
        <div className="file-name" title={file.name}>{file.name}</div>
        <div className="file-meta">
          {formatFileSize(file.size)} • {formatDate(file.modifiedTime)}
        </div>
      </div>
      <div className="file-actions">
        <button
          className="btn btn-sm btn-success"
          onClick={() => onDownload(file.name)}
          title="Download"
        >
          ⬇️
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(file.name)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default FileCard; 