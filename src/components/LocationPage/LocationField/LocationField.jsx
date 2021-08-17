import React from 'react';

export const LocationField = ({ location }) => {
  const { name, type, dimension } = location;

  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>{dimension}</td>
    </tr>
  );
};
