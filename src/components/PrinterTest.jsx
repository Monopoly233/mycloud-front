import { useState } from 'react';
import './PrinterTest.css';

const PrinterTest = () => {
  const [userAgent, setUserAgent] = useState(navigator.userAgent);
  const [isPrinter, setIsPrinter] = useState(false);
  const [detectionResult, setDetectionResult] = useState('');

  const checkPrinterDevice = () => {
    const userAgentLower = userAgent.toLowerCase();
    
    const printerPatterns = [
      /printer/,
      /print/,
      /hp/,
      /canon/,
      /epson/,
      /brother/,
      /samsung.*printer/,
      /xerox/,
      /ricoh/,
      /konica/,
      /sharp.*printer/,
      /lexmark/,
      /kyocera/,
      /oki/,
      /fuji.*printer/,
      /minolta/
    ];

    const matchedPatterns = printerPatterns.filter(pattern => pattern.test(userAgentLower));
    const isPrinterDevice = matchedPatterns.length > 0;
    
    setIsPrinter(isPrinterDevice);
    setDetectionResult(`
      User Agent: ${userAgent}
      Is Printer: ${isPrinterDevice ? 'Yes' : 'No'}
      Matched Patterns: ${matchedPatterns.map(p => p.source).join(', ')}
      Recommended View: ${isPrinterDevice ? 'PrinterView' : 'Other View'}
    `);
  };

  const testPrinterUserAgents = [
    'HP-Printer/1.0',
    'Canon-Printer/2.1',
    'Epson-Printer/1.5',
    'Brother-Printer/3.0',
    'Samsung-Printer/2.0',
    'Xerox-Printer/1.8',
    'Ricoh-Printer/2.2',
    'Konica-Printer/1.9',
    'Sharp-Printer/2.3',
    'Lexmark-Printer/1.7',
    'Kyocera-Printer/2.4',
    'OKI-Printer/1.6',
    'Fuji-Printer/2.5',
    'Minolta-Printer/1.4',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
  ];

  const setTestUserAgent = (testUA) => {
    setUserAgent(testUA);
  };

  return (
    <div className="printer-test-container">
      <h1>Printer Device Detection Test</h1>
      
      <div className="test-section">
        <h2>Current User-Agent</h2>
        <textarea 
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          rows={3}
          className="ua-input"
        />
        <button onClick={checkPrinterDevice} className="test-btn">
          Test Printer Detection
        </button>
      </div>

      <div className="test-section">
        <h2>Test Printer User-Agents</h2>
        <div className="test-buttons">
          {testPrinterUserAgents.map((ua, index) => (
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
          <div className={`result-indicator ${isPrinter ? 'printer' : 'not-printer'}`}>
            {isPrinter ? 'Printer Device Detected' : 'Not a Printer Device'}
          </div>
        </div>
      )}

      <div className="info-section">
        <h2>Printer Detection Logic</h2>
        <ul>
          <li>HP, Canon, Epson, Brother printers</li>
          <li>Samsung, Xerox, Ricoh printers</li>
          <li>Konica, Sharp, Lexmark printers</li>
          <li>Kyocera, OKI, Fuji, Minolta printers</li>
          <li>Generic printer and print identifiers</li>
        </ul>
        
        <h3>Testing Instructions</h3>
        <ol>
          <li>Use the test buttons to simulate different printer User-Agents</li>
          <li>Check if the device is correctly identified as a printer</li>
          <li>Verify that PrinterView is recommended for printer devices</li>
          <li>Test with your actual printer's User-Agent</li>
        </ol>
      </div>
    </div>
  );
};

export default PrinterTest; 