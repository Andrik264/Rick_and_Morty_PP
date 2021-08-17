import React from 'react';

export const FilterInput = ({
  type = 'text',
  value,
  onChange,
  placeholder,
 }) => {
  const handleChange = (event) => {
    const { value } = event.target;

    onChange(value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
