import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './importdata.css'; // Import your custom CSS file

const ProductImport = () => {
    const [file, setFile] = useState(null);
  
    const onDrop = (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
      <div className="product-import-container">
      
        <h1 className="import-header">ADD THE PRODUCT SHEETS</h1>
       
        <div className="grid-container">
          <div className="grid-item">
            <div className="box sales">
              <p>Product Sales</p>
              <span className="symbol">&#10003;</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="box margin">
              <p>Profit Margin</p>
              <span className="symbol">&#10003;</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="box items">
              <p>Updated Items</p>
              <span className="symbol">&#10003;</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="box ratings">
              <p>Ratings</p>
              <span className="symbol">&#10003;</span>
            </div>
          </div>
        </div>
        <div className="dropzone-container">
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <p>{isDragActive ? 'Drop the file here...' : 'Drag and drop the Excel file here, or click to select'}</p>
          </div>
        </div>
        {file && (
          <div className="file-preview">
            <h4>Selected File:</h4>
            <p>{file.name}</p>
          </div>
        )}
      </div>
    );
  };
  
  
  

export default ProductImport;
