import React, { useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import './style.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [outputName, setOutputName] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowQRCode(false);
  }

  const handleOutputNameChange = (event) => {
    setOutputName(event.target.value);
  }

  const handleGenerateQRCode = () => {
    setShowQRCode(true);
  }

  const handleDownloadQRCode = () => {
    if (!inputValue || !outputName) return;

    const node = document.getElementById('output');

    toPng(node)
      .then(function (dataUrl) {
        let downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = `${outputName}.png`;
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
        <input id="input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter text or link" required />
        <input id="outputName" type="text" value={outputName} onChange={handleOutputNameChange} placeholder="Enter output name" required />
        <button onClick={handleGenerateQRCode}>Generate</button>
        {showQRCode && (
          <div className="output">
            <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
              <div className="qrcode" id="output">
                <QRCode value={inputValue} size={128} />
              </div>
            </div>
            <button onClick={handleDownloadQRCode}>Download</button>
          </div>
        )}
        <p>Create by <a href="https://alfajjar.vercel.app" target="_blank" rel="noreferrer">bang_jarrrz</a></p>
      </div>


    </div>
  )
}

export default App;
