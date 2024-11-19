import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import { toPng } from "html-to-image";
import './GenerateBarcode.css';

function GenerateBarcode() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const barcodeRef = useRef(null);

  function generateBarcode(e) {
    setText(e.target.value);
  }

  function generateBarcodeImage() {
    if (barcodeRef.current) {
      toPng(barcodeRef.current)
        .then((dataUrl) => {
          setImageUrl(dataUrl); // Set the image URL for display and download
        })
        .catch((err) => {
          console.error("Error generating barcode image:", err);
        });
    }
  }

  return (
    <div className="App">
      <h1>Barcode Generation</h1>
      <div ref={barcodeRef}>
        <Barcode value={text} fontSize={1} />
      </div>
      <p>Enter Product Code</p>
      <div className="barcode-box">
        <input type="text" value={text} onChange={generateBarcode} />
      </div>
      <button onClick={generateBarcodeImage}>
        Generate Barcode Image
      </button>

      {imageUrl ? (
        <a href={imageUrl} download={`${text}.png`}>
          <img src={imageUrl} alt="Generated Barcode" />
        </a>
      ) : null}
    </div>
  );
}

export default GenerateBarcode;
