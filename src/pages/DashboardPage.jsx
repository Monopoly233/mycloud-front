import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FileList from '../components/FileList';
import UploadModal from '../components/UploadModal';
import { API_CONFIG } from '../config';
import './DashboardPage.css';

const DashboardPage = ({ onLogout }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [message, setMessage] = useState('');

  // 获取文件列表
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.API_BASE_URL}/files`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      } else {
        throw new Error('Failed to fetch files');
      }
    } catch (error) {
      setMessage('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  // 下载文件
  const handleDownload = async (filename) => {
    try {
      const response = await fetch(`${API_CONFIG.API_BASE_URL}/download/${encodeURIComponent(filename)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      setMessage('Download failed');
    }
  };

  // 删除文件
  const handleDelete = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.API_BASE_URL}/delete/${encodeURIComponent(filename)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setFiles(files.filter(file => file.name !== filename));
        setMessage('File deleted successfully');
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      setMessage('Delete failed');
    }
  };

  // 上传文件
  const handleUpload = async (files, onProgress) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append('file', file);
    }

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          setShowUploadModal(false);
          fetchFiles();
          setMessage('File uploaded successfully');
        } else {
          throw new Error('Upload failed');
        }
      });

      xhr.addEventListener('error', () => {
        throw new Error('Upload failed');
      });

      xhr.open('POST', `${API_CONFIG.API_BASE_URL}/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      xhr.send(formData);
    } catch (error) {
      setMessage('Upload failed');
    }
  };

  // 显示消息
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 初始加载
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="dashboard">
      <Header 
        onUpload={() => setShowUploadModal(true)}
        onLogout={onLogout}
      />
      
      <main className="main-content">
        <FileList
          files={files}
          loading={loading}
          onDownload={handleDownload}
          onDelete={handleDelete}
          onRefresh={fetchFiles}
        />
      </main>

      {showUploadModal && (
        <UploadModal
          onUpload={handleUpload}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {message && (
        <div className="message-overlay">
          <div className="message">{message}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 