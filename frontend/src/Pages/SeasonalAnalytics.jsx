import React, { useState, useEffect } from "react";
import "./SeasonalAnalytics.css";

function SeasonalAnalytics() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [productLineFilter, setProductLineFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [seasonFilter, setSeasonFilter] = useState("All Seasons");
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueSeasons, setUniqueSeasons] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/seasonal_product_stats"
      );
      const result = await response.json();
      setData(result);
      // Extract unique seasons from the data
      console.log(result);
      const seasons = Array.from(new Set(result.map((row) => row.Season)));
      setUniqueSeasons(seasons);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterData();
  }, [productLineFilter, ratingFilter, seasonFilter, data]);

  const handleProductLineChange = (e) => {
    setProductLineFilter(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSeasonFilter(e.target.value);
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

    if (seasonFilter !== "All Seasons") {
      filtered = filtered.filter((row) => row["Season"] === seasonFilter);
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
        <label>
          Season:
          <select value={seasonFilter} onChange={handleSeasonChange}>
            <option value="All Seasons">All Seasons</option>
            {uniqueSeasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
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
                <th>Season</th>
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
                    <td>{row["Season"]}</td>
                    <td>{row["Product line"]}</td>
                    <td>{row["Rating"]}</td>
                    <td>{row["Unit price"]}</td>
                    <td>{row["Quantity"]}</td>
                    <td>{row["gross income"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No matching data found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SeasonalAnalytics;
