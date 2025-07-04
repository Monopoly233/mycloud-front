import { useState } from 'react';
import './UserAgentTest.css';

const UserAgentTest = () => {
  const [userAgent, setUserAgent] = useState(navigator.userAgent);
  const [isLegacy, setIsLegacy] = useState(false);
  const [detectionResult, setDetectionResult] = useState('');

  const checkLegacyDevice = () => {
    const userAgentLower = userAgent.toLowerCase();
    
    const legacyPatterns = [
      /msie [1-9]/,
      /trident/,
      /firefox\/[1-5]/,
      /chrome\/[1-9]/,
      /safari\/[1-5]/,
      /opera\/[1-9]/,
      /edge\/[1-9]/,
      /android [1-3]/,
      /iphone os [1-5]/,
      /ipad.*os [1-5]/,
      /windows nt [1-5]/,
      /mac os x 10\.[1-5]/,
      /linux.*[1-9]/,
      /printer/,
      /embedded/,
      /smart-tv/,
      /webos/,
      /tizen/,
      /roku/,
      /xbox/,
      /playstation/,
      /nintendo/,
      /kindle/,
      /blackberry/,
      /symbian/,
      /windows phone/,
      /mobile.*[1-9]/,
      /tablet.*[1-9]/,
    ];

    const matchedPatterns = legacyPatterns.filter(pattern => pattern.test(userAgentLower));
    const isLegacyDevice = matchedPatterns.length > 0;
    
    setIsLegacy(isLegacyDevice);
    setDetectionResult(`
      User Agent: ${userAgent}
      Is Legacy: ${isLegacyDevice ? 'Yes' : 'No'}
      Matched Patterns: ${matchedPatterns.map(p => p.source).join(', ')}
      Recommended View: ${isLegacyDevice ? 'SimpleView' : 'Modern App'}
    `);
  };

  const testUserAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.0 Mobile/9A334 Safari/7534.48.3',
    'Mozilla/5.0 (Linux; Android 2.3.7; GT-I9100 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
    'HP-Printer/1.0',
    'Samsung Smart TV',
    'Roku/DVP-7.0 (297.00E04100A)',
    'Mozilla/5.0 (Xbox; Xbox Live Auth/2.0)',
    'Mozilla/5.0 (PlayStation 4 8.50) AppleWebKit/605.1.15 (KHTML, like Gecko)',
  ];

  const setTestUserAgent = (testUA) => {
    setUserAgent(testUA);
  };

  return (
    <div className="ua-test-container">
      <h1>User-Agent Detection Test</h1>
      
      <div className="test-section">
        <h2>Current User-Agent</h2>
        <textarea 
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          rows={3}
          className="ua-input"
        />
        <button onClick={checkLegacyDevice} className="test-btn">
          Test Detection
        </button>
      </div>

      <div className="test-section">
        <h2>Test User-Agents</h2>
        <div className="test-buttons">
          {testUserAgents.map((ua, index) => (
            <button 
              key={index}
              onClick={() => setTestUserAgent(ua)}
              className="ua-test-btn"
            >
              Test {index + 1}
            </button>
          ))}
        </div>
      </div>

      {detectionResult && (
        <div className="result-section">
          <h2>Detection Result</h2>
          <pre className="result-display">{detectionResult}</pre>
          <div className={`result-indicator ${isLegacy ? 'legacy' : 'modern'}`}>
            {isLegacy ? 'Legacy Device Detected' : 'Modern Device Detected'}
          </div>
        </div>
      )}

      <div className="info-section">
        <h2>Detection Logic</h2>
        <ul>
          <li>Internet Explorer 1-9 and IE 11 (Trident)</li>
          <li>Firefox 1-5, Chrome 1-9, Safari 1-5</li>
          <li>Android 1-3, iOS 1-5</li>
          <li>Printer devices</li>
          <li>Smart TV, WebOS, Tizen</li>
          <li>Gaming consoles (Xbox, PlayStation, Nintendo)</li>
          <li>Old mobile and tablet devices</li>
        </ul>
      </div>
    </div>
  );
};

export default UserAgentTest; 