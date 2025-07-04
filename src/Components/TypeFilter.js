import React from 'react';

const TypeFilter = ({ selectedType, onTypeChange }) => {
  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
      className="type-filter"
    >
      <option value="">All Types</option>
      <option value="movie">Movie</option>
      <option value="series">Series</option>
      <option value="episode">Episode</option>
    </select>
  );
};

export default TypeFilter;
