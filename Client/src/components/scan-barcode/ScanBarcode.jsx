import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./ScanBarcode.css";

function ScanBarcode() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 350,
        height: 350,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <div className="App">
      <h1>QR Code Scanner</h1>
      {scanResult ? (
        <a href={scanResult}>{scanResult}</a>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default ScanBarcode;
