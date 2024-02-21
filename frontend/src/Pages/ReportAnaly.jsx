import React, { useState, useEffect } from "react";
import "./ReportAnaly.css";

const ReportAnaly = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState("popularity");
  const [seasonOption, setSeasonOption] = useState("Monsoon");
  const [seasonItems, setSeasonItems] = useState({});
  const [dummyItems, setDummyItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/calculate_popularity"
      );
      let result = await response.json();
      result = result.slice(0, 16);
      setData(result);

      const response2 = await fetch("http://localhost:5000/seasonal_analysis");
      let result2 = await response2.json();
      console.log(result2);
      setSeasonItems(result2);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);

    // Reset season option when a different option is selected
    if (event.target.value !== "season") {
      setSeasonOption("summer");
    } else if (event.target.value === "season" && seasonItems) {
      // Set the initial season option based on the first season available
      const firstSeason = Object.keys(seasonItems)[0];
      setSeasonOption(firstSeason);
    }
  };

  const handleSeasonOptionChange = (event) => {
    setSeasonOption(event.target.value);
  };

  // Dummy data for the shelf table
  const dummyPopularityItems = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
  ];

  const dummySeasonItems = {
    summer: [
      "Summer Item 1",
      "Summer Item 2",
      "Summer Item 3",
      "Summer Item 4",
      "Summer Item 5",
      "Summer Item 6",
      "Summer Item 7",
      "Summer Item 8",
      "Summer Item 9",
      "Summer Item 10",
      "Summer Item 11",
      "Summer Item 12",
      "Summer Item 13",
      "Summer Item 14",
      "Summer Item 15",
      "Summer Item 16",
    ],
    winter: [
      "Winter Item 1",
      "Winter Item 2",
      "Winter Item 3",
      "Winter Item 4",
      "Winter Item 5",
      "Winter Item 6",
      "Winter Item 7",
      "Winter Item 8",
      "Winter Item 9",
      "Winter Item 10",
      "Winter Item 11",
      "Winter Item 12",
      "Winter Item 13",
      "Winter Item 14",
      "Winter Item 15",
      "Winter Item 16",
    ],
    monsoon: [
      "Monsoon Item 1",
      "Monsoon Item 2",
      "Monsoon Item 3",
      "Monsoon Item 4",
      "Monsoon Item 5",
      "Monsoon Item 6",
      "Monsoon Item 7",
      "Monsoon Item 8",
      "Monsoon Item 9",
      "Monsoon Item 10",
      "Monsoon Item 11",
      "Monsoon Item 12",
      "Monsoon Item 13",
      "Monsoon Item 14",
      "Monsoon Item 15",
      "Monsoon Item 16",
    ],
  };

  useEffect(() => {
    const newData = [];
    data.map((ele, index) => {
      newData.push(ele["Product line"]);
    });
    setDummyItems(newData);
    setIsLoading(false);
  }, [data]);

  // Function to balance data between seasonality and popularity
  const balanceAllData = () => {
    const balancedData = [];
    for (let i = 0; i < 16; i++) {
      balancedData.push(dummyPopularityItems[i]);
      balancedData.push(dummySeasonItems.summer[i]);
      balancedData.push(dummySeasonItems.winter[i]);
      balancedData.push(dummySeasonItems.monsoon[i]);
    }
    return balancedData;
  };

  // Determine which data to display based on the selected option
  const getDataToShow = () => {
    if (selectedOption === "popularity") {
      return dummyItems;
    } else if (selectedOption === "season") {
      // Check if seasonOption exists in seasonItems
      console.log(seasonItems[seasonOption]);
      if (seasonItems && seasonItems[seasonOption]) {
        let newData = [];
        seasonItems[seasonOption].map((ele) => {
          newData.push(ele["Product line"]);
        });
        newData = newData.slice(0, 16);
        return newData;
      } else {
        // Handle the case when seasonOption is not found
        return [];
      }
    } else if (selectedOption === "all") {
      return balanceAllData();
    }
  };

  return (
    <div>
      <div className="dropdown-container">
        <div className="label-dropdown">
          <label htmlFor="sortOptions">Select Sorting Option:</label>
          <select
            id="sortOptions"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="popularity">Popularity</option>
            <option value="season">Season</option>
            {/* <option value="all">All</option> */}
          </select>
        </div>

        {/* Display additional options for Season selection */}
        {seasonItems && selectedOption === "season" && (
          <div className="label-dropdown">
            <label htmlFor="seasonOptions">Select Season:</label>
            <select
              id="seasonOptions"
              value={seasonOption}
              onChange={handleSeasonOptionChange}
            >
              {Object.keys(seasonItems).map((ele) => {
                return <option value={`${ele}`}>{ele}</option>;
              })}
            </select>
          </div>
        )}
      </div>

      {!isLoading && <ShelfTable items={getDataToShow()} />}
    </div>
  );
};

const ShelfTable = ({ items }) => {
  return (
    <div className="shelf-table-container">
      <table className="shelf-table">
        <tbody>
          {[...Array(4)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(4)].map((_, colIndex) => (
                <td key={colIndex}>{items[rowIndex * 4 + colIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportAnaly;
