import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { API_CONFIG, APP_CONFIG } from './config';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // 检查登录状态
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // 设置axios默认头部
      axios.defaults.headers.common['X-Password'] = token;
    }
  }, []);

  // 设置axios默认headers
  const setAuthHeader = (pwd) => {
    axios.defaults.headers.common['X-Password'] = pwd;
  };

  // 登录处理
  const handleLogin = async (pwd) => {
    setLoading(true);
    setMessage('');

    try {
      setAuthHeader(pwd);
      const response = await axios.get(`${API_CONFIG.API_BASE_URL}/files`);
      localStorage.setItem('token', pwd); // 存储密码作为token
      setIsLoggedIn(true);
      setPassword(pwd);
      setFiles(response.data.files || []);
      setMessage('Login successful!');
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('Invalid password');
      } else if (error.code === 'ERR_NETWORK') {
        setMessage('Unable to connect to the server, please check if the backend is running');
      } else {
        setMessage(`Login failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 获取文件列表
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.API_BASE_URL}/files`);
      setFiles(response.data.files || []);
    } catch (error) {
      setMessage('Failed to get file list');
    }
  };

  // 上传文件
  const handleFileUpload = async (files, onProgress) => {
    if (!files || files.length === 0) return;

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      await axios.post(`${API_CONFIG.API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(progress);
        },
      });

      setMessage('File upload successful!');
      fetchFiles();
      setShowUploadModal(false);
    } catch (error) {
      setMessage('File upload failed');
    } finally {
      setLoading(false);
    }
  };

  // 下载文件
  const handleDownload = async (filename) => {
    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.get(`${API_CONFIG.API_BASE_URL}/download/${encodeURIComponent(filename)}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setMessage('File download successful!');
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('Download failed: Password verification error');
      } else {
        setMessage('File download failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // 删除文件
  const handleDelete = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete file "${filename}"?`)) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.delete(`${API_CONFIG.API_BASE_URL}/delete/${encodeURIComponent(filename)}`);
      setMessage('File deletion successful!');
      fetchFiles();
    } catch (error) {
      setMessage('File deletion failed');
    } finally {
      setLoading(false);
    }
  };

  // 登出处理
  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['X-Password'];
    setIsLoggedIn(false);
    setPassword('');
    setMessage('');
    setFiles([]);
    setShowUploadModal(false);
  };

  // 显示上传模态框
  const handleShowUploadModal = () => {
    setShowUploadModal(true);
  };

  // 隐藏上传模态框
  const handleHideUploadModal = () => {
    setShowUploadModal(false);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <DashboardPage
          files={files}
          loading={loading}
          message={message}
          showUploadModal={showUploadModal}
          onUpload={handleFileUpload}
          onDownload={handleDownload}
          onDelete={handleDelete}
          onRefresh={fetchFiles}
          onLogout={handleLogout}
          onShowUploadModal={handleShowUploadModal}
          onHideUploadModal={handleHideUploadModal}
        />
      ) : (
        <LoginPage
          onLogin={handleLogin}
          loading={loading}
          message={message}
        />
      )}
    </div>
  );
};

export default App;
