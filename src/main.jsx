import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SimpleView from './components/SimpleView.jsx'
import UserAgentTest from './components/UserAgentTest.jsx'

// User-Agent detection for older devices
const isLegacyDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for older browsers and devices - more specific patterns
  const legacyPatterns = [
    /msie [1-9]\./,          // Internet Explorer 1-9 (with version number)
    /trident\/[1-7]\./,      // IE 11 with specific version
    /firefox\/[1-5]\./,      // Firefox 1-5 (with version number)
    /chrome\/[1-9]\./,       // Chrome 1-9 (with version number)
    /safari\/[1-5]\./,       // Safari 1-5 (with version number)
    /opera\/[1-9]\./,        // Opera 1-9 (with version number)
    /edge\/[1-9]\./,         // Edge 1-9 (with version number)
    /android [1-3]\./,       // Android 1-3 (with version number)
    /iphone os [1-5]_/,      // iOS 1-5 (with underscore)
    /ipad.*os [1-5]_/,       // iPad iOS 1-5 (with underscore)
    /windows nt [1-5]\./,    // Windows NT 1-5 (with version number)
    /mac os x 10\.[1-5]/,    // macOS 10.1-10.5
    /linux [1-9]\./,         // Linux kernel 1-9 (with version number)
    /printer/,                // Printer devices
    /embedded/,               // Embedded devices
    /smart-tv/,              // Smart TV
    /webos/,                 // LG WebOS
    /tizen/,                 // Samsung Tizen
    /roku/,                  // Roku devices
    /xbox/,                  // Xbox
    /playstation/,           // PlayStation
    /nintendo/,              // Nintendo
    /kindle/,                // Kindle
    /blackberry/,            // BlackBerry
    /symbian/,               // Symbian
    /windows phone/,         // Windows Phone
    /mobile.*[1-9]\./,       // Mobile devices with old versions (with version number)
    /tablet.*[1-9]\./,       // Tablet devices with old versions (with version number)
  ];

  // Check if any legacy pattern matches
  const isLegacy = legacyPatterns.some(pattern => pattern.test(userAgent));
  
  // Additional checks for specific device types
  const isPrinter = userAgent.includes('printer') || userAgent.includes('print');
  const isEmbedded = userAgent.includes('embedded') || userAgent.includes('smart-tv');
  const isOldMobile = userAgent.includes('mobile') && (
    userAgent.includes('android 2.') || 
    userAgent.includes('android 3.') ||
    userAgent.includes('iphone os 3_') ||
    userAgent.includes('iphone os 4_') ||
    userAgent.includes('iphone os 5_')
  );

  // Debug information
  console.log('User-Agent:', userAgent);
  console.log('Is Legacy Pattern Match:', isLegacy);
  console.log('Is Printer:', isPrinter);
  console.log('Is Embedded:', isEmbedded);
  console.log('Is Old Mobile:', isOldMobile);
  console.log('Final Result:', isLegacy || isPrinter || isEmbedded || isOldMobile);
  
  return isLegacy || isPrinter || isEmbedded || isOldMobile;
};

// Check for modern browser features
const hasModernFeatures = () => {
  return (
    typeof fetch !== 'undefined' &&
    typeof Promise !== 'undefined' &&
    typeof Array.prototype.map !== 'undefined' &&
    typeof Object.assign !== 'undefined' &&
    typeof window.addEventListener !== 'undefined'
  );
};

// Determine which view to render
const getAppComponent = () => {
  // Check for test mode in URL
  const urlParams = new URLSearchParams(window.location.search);
  const testMode = urlParams.get('test');
  
  if (testMode === 'ua') {
    console.log('User-Agent test mode enabled');
    return UserAgentTest;
  }
  
  // Force simple view for testing (uncomment to test)
  return SimpleView;
  
  // Always show debug info for now
  const isLegacy = isLegacyDevice();
  console.log('=== Device Detection Debug ===');
  console.log('User-Agent:', navigator.userAgent);
  console.log('Is Legacy Device:', isLegacy);
  console.log('Has Modern Features:', hasModernFeatures());
  
  if (isLegacy) {
    console.log('Legacy device detected, using SimpleView');
    return SimpleView;
  }
  
  if (!hasModernFeatures()) {
    console.log('Modern features not available, using SimpleView');
    return SimpleView;
  }
  
  console.log('Modern device detected, using App');
  return App;
};

const AppComponent = getAppComponent();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppComponent />
  </StrictMode>,
)
