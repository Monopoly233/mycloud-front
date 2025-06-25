import React, { useState } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

const API_BASE = 'http://localhost:8080/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

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
      const response = await axios.get(`${API_BASE}/files`);
      setIsAuthenticated(true);
      setPassword(pwd);
      setFiles(response.data.files || []);
      setMessage('登录成功！');
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('密码错误，请重试');
      } else if (error.code === 'ERR_NETWORK') {
        setMessage('无法连接到服务器，请检查后端是否启动');
      } else {
        setMessage(`登录失败: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 获取文件列表
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_BASE}/files`);
      setFiles(response.data.files || []);
    } catch (error) {
      setMessage('获取文件列表失败');
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

      await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(progress);
        },
      });

      setMessage('文件上传成功！');
      fetchFiles();
      setShowUploadModal(false);
    } catch (error) {
      setMessage('文件上传失败');
    } finally {
      setLoading(false);
    }
  };

  // 下载文件
  const handleDownload = async (filename) => {
    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.get(`${API_BASE}/download/${encodeURIComponent(filename)}`, {
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
      
      setMessage('文件下载成功！');
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('下载失败：密码验证错误');
      } else {
        setMessage('文件下载失败');
      }
    } finally {
      setLoading(false);
    }
  };

  // 删除文件
  const handleDelete = async (filename) => {
    if (!window.confirm(`确定要删除文件 "${filename}" 吗？`)) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.delete(`${API_BASE}/delete/${encodeURIComponent(filename)}`);
      setMessage('文件删除成功！');
      fetchFiles();
    } catch (error) {
      setMessage('文件删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 退出登录
  const handleLogout = () => {
    setIsAuthenticated(false);
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

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={handleLogin}
        loading={loading}
        message={message}
      />
    );
  }

  return (
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
  );
}

export default App;
