import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config';
import './PreviewModal.css';

const PreviewModal = ({ file, isOpen, onClose, password }) => {
  const [previewContent, setPreviewContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 获取文件扩展名
  const getFileExtension = (filename) => {
    return filename.split('.').pop()?.toLowerCase();
  };

  // 判断文件类型
  const getFileType = (filename) => {
    const ext = getFileExtension(filename);
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico'];
    const textTypes = ['txt', 'md', 'json', 'xml', 'html', 'htm', 'css', 'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'dart'];
    const videoTypes = ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'm4v'];
    const audioTypes = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma'];
    const pdfTypes = ['pdf'];

    if (imageTypes.includes(ext)) return 'image';
    if (textTypes.includes(ext)) return 'text';
    if (videoTypes.includes(ext)) return 'video';
    if (audioTypes.includes(ext)) return 'audio';
    if (pdfTypes.includes(ext)) return 'pdf';
    return 'other';
  };

  // 清理blob URL
  const cleanupBlobUrl = (url) => {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  // 加载预览内容
  const loadPreview = async () => {
    if (!file || !isOpen) return;

    setLoading(true);
    setError(null);
    
    // 清理之前的blob URL
    if (previewContent && previewContent.url) {
      cleanupBlobUrl(previewContent.url);
    }
    
    setPreviewContent(null);

    try {
      const fileType = getFileType(file.name);
      
      if (fileType === 'image') {
        // 图片文件使用fetch获取blob URL
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/files/${encodeURIComponent(file.name)}`, {
          headers: {
            'X-Password': password
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load image');
        }
        
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setPreviewContent({ type: 'image', url: imageUrl });
      } else if (fileType === 'text') {
        // 文本文件获取内容
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/files/${encodeURIComponent(file.name)}`, {
          headers: {
            'X-Password': password
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load text file');
        }
        
        const text = await response.text();
        setPreviewContent({ type: 'text', content: text });
      } else if (fileType === 'video') {
        // 视频文件使用fetch获取blob URL
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/files/${encodeURIComponent(file.name)}`, {
          headers: {
            'X-Password': password
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load video');
        }
        
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob);
        setPreviewContent({ type: 'video', url: videoUrl });
      } else if (fileType === 'audio') {
        // 音频文件使用fetch获取blob URL
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/files/${encodeURIComponent(file.name)}`, {
          headers: {
            'X-Password': password
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load audio');
        }
        
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setPreviewContent({ type: 'audio', url: audioUrl });
      } else if (fileType === 'pdf') {
        // PDF文件使用fetch获取blob URL
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/files/${encodeURIComponent(file.name)}`, {
          headers: {
            'X-Password': password
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load PDF');
        }
        
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        setPreviewContent({ type: 'pdf', url: pdfUrl });
      } else {
        // 其他文件显示信息
        setPreviewContent({ type: 'other', file });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 当模态框打开时加载预览
  useEffect(() => {
    if (isOpen) {
      loadPreview();
    }
  }, [isOpen, file]);

  // 组件卸载时清理blob URL
  useEffect(() => {
    return () => {
      if (previewContent && previewContent.url) {
        cleanupBlobUrl(previewContent.url);
      }
    };
  }, [previewContent]);

  // 处理其他文件类型的下载
  const handleDownload = async () => {
    try {
      const response = await fetch(`${API_CONFIG.API_BASE_URL}/download/${encodeURIComponent(file.name)}`, {
        headers: {
          'X-Password': password
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      setError('Download failed');
    }
  };

  // 渲染预览内容
  const renderPreview = () => {
    if (loading) {
      return <div className="preview-loading">Loading preview...</div>;
    }

    if (error) {
      return <div className="preview-error">Error: {error}</div>;
    }

    if (!previewContent) {
      return <div className="preview-error">No preview available</div>;
    }

    switch (previewContent.type) {
      case 'image':
        return (
          <div className="preview-image">
            <img src={previewContent.url} alt={file.name} />
          </div>
        );
      
      case 'text':
        return (
          <div className="preview-text">
            <pre>{previewContent.content}</pre>
          </div>
        );
      
      case 'video':
        return (
          <div className="preview-video">
            <video controls>
              <source src={previewContent.url} type={`video/${getFileExtension(file.name)}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      
      case 'audio':
        return (
          <div className="preview-audio">
            <audio controls>
              <source src={previewContent.url} type={`audio/${getFileExtension(file.name)}`} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      
      case 'pdf':
        return (
          <div className="preview-pdf">
            <iframe 
              src={previewContent.url} 
              title={file.name}
              width="100%" 
              height="100%"
            />
          </div>
        );
      
      case 'other':
        return (
          <div className="preview-other">
            <div className="file-info">
              <h3>File Information</h3>
              <p><strong>Name:</strong> {file.name}</p>
              <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
              <p><strong>Modified:</strong> {formatDate(file.modifiedTime)}</p>
              <p><strong>Type:</strong> {getFileExtension(file.name).toUpperCase()} file</p>
            </div>
            <div className="download-section">
              <p>This file type cannot be previewed. Please download to view.</p>
              <button className="btn btn-primary" onClick={handleDownload}>
                Download File
              </button>
            </div>
          </div>
        );
      
      default:
        return <div className="preview-error">Unsupported file type</div>;
    }
  };

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

  if (!isOpen) return null;

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal-header">
          <h2>{file?.name}</h2>
          <button className="preview-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="preview-modal-content">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal; 