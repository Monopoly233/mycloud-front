import React from 'react';
import Header from '../components/Header';
import FileList from '../components/FileList';
import UploadModal from '../components/UploadModal';
import './DashboardPage.css';

const DashboardPage = ({
  files,
  loading,
  message,
  showUploadModal,
  onUpload,
  onDownload,
  onDelete,
  onRefresh,
  onLogout,
  onShowUploadModal,
  onHideUploadModal
}) => {
  return (
    <div className="app-container">
      <Header 
        onUpload={onShowUploadModal}
        onLogout={onLogout}
      />

      {message && (
        <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <main className="main-content">
        <FileList
          files={files}
          loading={loading}
          onDownload={onDownload}
          onDelete={onDelete}
          onRefresh={onRefresh}
        />
      </main>

      {showUploadModal && (
        <UploadModal
          onUpload={onUpload}
          onClose={onHideUploadModal}
        />
      )}
    </div>
  );
};

export default DashboardPage; 