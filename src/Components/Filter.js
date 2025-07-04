import React from 'react';

const Filter = ({ selectedYear, onYearChange }) => {
  const years = [];
  for (let y = 2024; y >= 1990; y--) {
    years.push(y);
  }

  return (
    <select
      value={selectedYear}
      onChange={(e) => onYearChange(e.target.value)}
      className="year-filter"
    >
      <option value="">All Years</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default Filter;
