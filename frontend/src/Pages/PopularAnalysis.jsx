import React, { useState, useEffect } from "react";
import "./PopularAnalysisPage.css";

function PopularAnalysis() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [productLineFilter, setProductLineFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/calculate_product_stats"
      );
      const result = await response.json();
      //   const parsedData = Array.isArray(result[0]) ? result[0] : result;

      setData(result);
      console.log(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterData();
  }, [productLineFilter, ratingFilter, data]);

  const handleProductLineChange = (e) => {
    setProductLineFilter(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const filterData = () => {
    let filtered = [...data];

    if (productLineFilter) {
      filtered = filtered.filter((row) =>
        row["Product line"]
          .toLowerCase()
          .includes(productLineFilter.toLowerCase())
      );
    }

    if (ratingFilter) {
      filtered = filtered.filter(
        (row) => row["Rating"] >= parseFloat(ratingFilter)
      );
    }

    setFilteredData((prevData) => {
      // Using a callback function to ensure that the state is updated correctly
      return [...filtered];
    });
  };

  return (
    <div className="content-inner">
      <div className="filters">
        <label>Search Filters:</label>
        <label>
          Product Name:
          <input
            type="text"
            placeholder="search.."
            value={productLineFilter}
            onChange={handleProductLineChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={ratingFilter}
            onChange={handleRatingChange}
          />
          {ratingFilter}
        </label>
      </div>
      <div className="table-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Product Name</th>
                <th>Rating</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Gross Income</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row["Product line"]}</td>
                    <td>{row["Rating"]}</td>
                    <td>{row["Unit price"]}</td>
                    <td>{row["Quantity"]}</td>
                    <td>{row["gross income"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No matching data found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PopularAnalysis;
