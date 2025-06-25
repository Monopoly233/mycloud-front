// API配置
export const API_CONFIG = {
  // 服务器IP地址 - 使用Cloudflare Tunnel公共URL
  SERVER_IP: 'pads-dynamic-responses-debug.trycloudflare.com',
  // 服务器端口 - Cloudflare Tunnel使用HTTPS，端口为443
  SERVER_PORT: '443',
  // API基础路径
  API_BASE_PATH: '/api',
  // 完整API基础URL
  get API_BASE_URL() {
    return `https://${this.SERVER_IP}${this.API_BASE_PATH}`;
  },
  // 服务器完整地址
  get SERVER_URL() {
    return `https://${this.SERVER_IP}`;
  }
};

// 应用配置
export const APP_CONFIG = {
  // 应用名称
  APP_NAME: 'My Cloud',
  // 应用描述
  APP_DESCRIPTION: 'Simple and secure personal file management',
  // 默认密码（仅用于开发测试）
  DEFAULT_PASSWORD: '123456'
};

// 文件配置
export const FILE_CONFIG = {
  // 最大文件大小（字节）
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  // 文件图标映射
  FILE_ICONS: {
    // 文档类型
    pdf: '📄',
    doc: '📝', docx: '📝',
    xls: '📊', xlsx: '📊',
    ppt: '📽️', pptx: '📽️',
    txt: '📄', md: '📄', rtf: '📄',
    
    // 图片类型
    jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', 
    bmp: '🖼️', svg: '🖼️', webp: '🖼️', ico: '🖼️',
    
    // 视频类型
    mp4: '🎥', avi: '🎥', mov: '🎥', mkv: '🎥',
    wmv: '🎥', flv: '🎥', webm: '🎥', m4v: '🎥',
    
    // 音频类型
    mp3: '🎵', wav: '🎵', flac: '🎵', aac: '🎵',
    ogg: '🎵', m4a: '🎵', wma: '🎵',
    
    // 压缩文件
    zip: '📦', rar: '📦', '7z': '📦', tar: '📦',
    gz: '📦', bz2: '📦', xz: '📦',
    
    // 代码文件
    js: '💻', jsx: '💻', ts: '💻', tsx: '💻',
    html: '🌐', htm: '🌐', css: '🎨', scss: '🎨',
    sass: '🎨', less: '🎨', json: '📋', xml: '📋',
    py: '🐍', java: '☕', cpp: '⚙️', c: '⚙️',
    cs: '🔷', php: '🐘', rb: '💎', go: '🐹',
    rs: '🦀', swift: '🍎', kt: '☕', dart: '🎯',
    
    // 其他常见文件
    exe: '⚙️', dmg: '🍎', pkg: '📦', deb: '🐧',
    rpm: '🐧', apk: '📱', iso: '💿', bin: '⚙️',
    
    // 默认图标
    default: '📄'
  }
}; 