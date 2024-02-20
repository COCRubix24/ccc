import React, {useState} from 'react';

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

  return (
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

      {/* Displaying the selected options (for demonstration purposes) */}
      <p>
        Selected Sorting Option: {selectedOption}
        {selectedOption === 'season' && `, Selected Season: ${seasonOption}`}
      </p>
    </div>
  );
}
export default ReportAnaly;