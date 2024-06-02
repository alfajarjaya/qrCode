import React, { useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import './style.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowQRCode(false);
  }

  const handleGenerateQRCode = () => {
    setShowQRCode(true);
  }

  const handleDownloadQRCode = () => {
    if (!inputValue) return;

    const node = document.getElementById('output');

    toPng(node)
      .then(function (dataUrl) {
        let downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = `${inputValue}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch(function (error) {
        console.error('Oops! Something went wrong', error);
      });
  }

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <div className="form">
        <input id="input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter text or link" />
        <button onClick={handleGenerateQRCode}>Generate</button>
      </div>

      {showQRCode && (
        <div className="output" id="output">
          <div style={{ display: "flex", justifyContent: "center", margin: 20 }} >
            <div className="qrcode">
              <QRCode value={inputValue} size={128} />
            </div>
          </div>
          <button onClick={handleDownloadQRCode}>Download</button>
        </div>
      )}
    </div>
  )
}

export default App;
