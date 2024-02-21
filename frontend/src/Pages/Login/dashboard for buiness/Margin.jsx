import React, { useState } from 'react';
import './Margin.css';

const Margin = () => {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [shelfImages, setShelfImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        imagesArray.push(e.target.result);
        if (imagesArray.length === files.length) {
          setShelfImages(imagesArray);
        }
      };

      reader.readAsDataURL(files[i]);
    }
  };

  const analyzeShelf = () => {
    setLoading(true);

    // Simulating analyzing process
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 2000); // Simulating 2 seconds of analyzing time
  };

  return (
    <>
     <h1 className='umm'>Let's Examine the shelf</h1>
    <div className="container">
   
    <div className="shelf-analyzer">
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <button onClick={analyzeShelf}>Analyze</button>

      {loading && <div className="loading">Analyzing...</div>}

      {analyzed && (
        <div className="items-placement">
          {/* Display the analyzed shelf items here */}
        </div>
      )}

      <div className="shelf-images">
        {shelfImages.map((image, index) => (
          <img key={index} src={image} alt={`Shelf ${index + 1}`} />
        ))}
      </div>
    </div>
    <div className="paragraph-card">
        <h1 className='oo'>ANALYSIS</h1>
    <p>
      The first row of the shelf should contain 2 elements of this type and all.
    </p>
  </div>
    </div>
    </>
  );
};

export default Margin;
