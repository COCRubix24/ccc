import React, { useState } from 'react';
import './Margin.css';

const ShelfAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [shelfImages, setShelfImages] = useState([]);
  const [itemsPlacement, setItemsPlacement] = useState([]);

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
      // Dummy items placement data
      const placementData = [
        { name: 'Item 1', position: 'Top Left' },
        { name: 'Item 2', position: 'Top Right' },
        { name: 'Item 3', position: 'Bottom Left' },
        { name: 'Item 4', position: 'Bottom Right' }
      ];

      setItemsPlacement(placementData);
      setLoading(false);
      setAnalyzed(true);
    }, 2000); // Simulating 2 seconds of analyzing time
  };

  return (
    <div className="shelf-analyzer">
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <button onClick={analyzeShelf}>Analyze</button>

      {loading && <div className="loading">Analyzing...</div>}

      {analyzed && (
        <div className="items-placement">
          {itemsPlacement.map((item, index) => (
            <div key={index} className="item">{item.name} - {item.position}</div>
          ))}
        </div>
      )}

      <div className="shelf-images">
        {shelfImages.map((image, index) => (
          <img key={index} src={image} alt={`Shelf ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ShelfAnalyzer;
