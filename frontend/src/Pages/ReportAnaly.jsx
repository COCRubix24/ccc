import React, { useState } from 'react';
import "./ReportAnaly.css";

const ReportAnaly = () => {
  const [selectedOption, setSelectedOption] = useState('popularity');
  const [seasonOption, setSeasonOption] = useState('summer');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);

    // Reset season option when a different option is selected
    if (event.target.value !== 'season') {
      setSeasonOption('summer');
    }
  };

  const handleSeasonOptionChange = (event) => {
    setSeasonOption(event.target.value);
  };

  // Dummy data for the shelf table
  const dummyPopularityItems = [
    'Item 1', 'Item 2', 'Item 3', 'Item 4',
    'Item 5', 'Item 6', 'Item 7', 'Item 8',
    'Item 9', 'Item 10', 'Item 11', 'Item 12',
    'Item 13', 'Item 14', 'Item 15', 'Item 16'
  ];

  const dummySeasonItems = {
    summer: [
      'Summer Item 1', 'Summer Item 2', 'Summer Item 3', 'Summer Item 4',
      'Summer Item 5', 'Summer Item 6', 'Summer Item 7', 'Summer Item 8',
      'Summer Item 9', 'Summer Item 10', 'Summer Item 11', 'Summer Item 12',
      'Summer Item 13', 'Summer Item 14', 'Summer Item 15', 'Summer Item 16'
    ],
    winter:  [
      'Winter Item 1', 'Winter Item 2', 'Winter Item 3', 'Winter Item 4',
      'Winter Item 5', 'Winter Item 6', 'Winter Item 7', 'Winter Item 8',
      'Winter Item 9', 'Winter Item 10', 'Winter Item 11', 'Winter Item 12',
      'Winter Item 13', 'Winter Item 14', 'Winter Item 15', 'Winter Item 16'
    ],
    monsoon: [
      'Monsoon Item 1', 'Monsoon Item 2', 'Monsoon Item 3', 'Monsoon Item 4',
      'Monsoon Item 5', 'Monsoon Item 6', 'Monsoon Item 7', 'Monsoon Item 8',
      'Monsoon Item 9', 'Monsoon Item 10', 'Monsoon Item 11', 'Monsoon Item 12',
      'Monsoon Item 13', 'Monsoon Item 14', 'Monsoon Item 15', 'Monsoon Item 16'
    ]
  };

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
    if (selectedOption === 'popularity') {
      return dummyPopularityItems;
    } else if (selectedOption === 'season') {
      return dummySeasonItems[seasonOption];
    } else if (selectedOption === 'all') {
      return balanceAllData();
    }
  };

  return (
    <div>
      <div className="dropdown-container">
        <div className="label-dropdown">
          <label htmlFor="sortOptions">Select Sorting Option:</label>
          <select id="sortOptions" value={selectedOption} onChange={handleDropdownChange}>
            <option value="popularity">Popularity</option>
            <option value="season">Season</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Display additional options for Season selection */}
        {selectedOption === 'season' && (
          <div className="label-dropdown">
            <label htmlFor="seasonOptions">Select Season:</label>
            <select id="seasonOptions" value={seasonOption} onChange={handleSeasonOptionChange}>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="monsoon">Monsoon</option>
            </select>
          </div>
        )}
      </div>

      {/* Displaying the shelf table based on the selected options */}
      <ShelfTable items={getDataToShow()} />
    </div>
  );
}

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
