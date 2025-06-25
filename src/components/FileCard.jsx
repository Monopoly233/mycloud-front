import React from 'react';
import { FILE_CONFIG } from '../config';
import './FileCard.css';

const FileCard = ({ file, onDownload, onDelete, onPreview }) => {
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

  // 判断文件是否可预览
  const isPreviewable = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const previewableTypes = [
      // 图片
      'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico',
      // 文本
      'txt', 'md', 'json', 'xml', 'html', 'htm', 'css', 'js', 'jsx', 'ts', 'tsx', 
      'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'dart',
      // 视频
      'mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'm4v',
      // 音频
      'mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma',
      // PDF
      'pdf'
    ];
    return previewableTypes.includes(ext);
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
        {isPreviewable(file.name) && (
          <button
            className="btn btn-sm btn-info"
            onClick={() => onPreview(file)}
            title="Preview"
          >
            👁️
          </button>
        )}
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