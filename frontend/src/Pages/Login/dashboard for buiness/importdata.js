import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './importdata.css'; // Import your custom CSS file
import { UserContext } from "../../../Components/context/UserContext";
import { useContext } from "react";

import axios from "axios";


const ProductImport = () => {
    const [file, setFile] = useState(null);
    const { userr } =
        useContext(UserContext);
  
    const onDrop = async (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(userr);
        formData.append('id', userr._id);

        const response = await axios.post(
            "http://localhost:8800/api/auth/addExcel",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log(response.data);
        console.log("Register successful");
    } catch (error) {
        console.error(error.response);
    }
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
        <>
         <h2 className="import-header">UPLOAD YOUR FILE</h2>
         
     
                <div className="alert-container">
                    <div className="alert-symbol">&#9888;</div>
                    <p className="error-message">Before uploading, please ensure that the file contains the following data.</p>
                </div>
        
            <div className="product-import-container">
                <div className="grid-containerhe">
                    <div className="grid-item">
                        <div className="box sales">
                            <p className='uoo'>Product line</p>
                            <span className="symbol">&#10003;</span>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="box margin">
                            <p className='uoo'>Unit Price</p>
                            <span className="symbol">&#10003;</span>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="box items">
                            <p className='uoo'>Quantity</p>
                            <span className="symbol">&#10003;</span>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="box date">
                            <p className='uoo'>Date</p>
                            <span className="symbol">&#10003;</span>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="box time">
                            <p className='uoo'>Time</p>
                            <span className="symbol">&#10003;</span>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="box cost">
                            <p className='uoo'>Cost of good sales</p>
                            <span className="symbol">&#10003;</span>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="box ratings">
                            <p className='uoo'>Ratings</p>
                            <span className="symbol">&#10003;</span>
                        </div>
                    </div>
                </div>
                <div className="dropzone-container">
                    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                        <input name='file' {...getInputProps()} />
                        <p>{isDragActive ? 'Drop the file here...' : 'Drag and drop the Excel file here, or click to select'}</p>
                    </div>
                    {file && (
                        <div className="file-preview">
                            <h4>Selected File:</h4>
                            <p>{file.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductImport;