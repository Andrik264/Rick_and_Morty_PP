import React from 'react';

import { LocationField } from '../LocationField';

export const LocationList = ({ locations }) => {

  return (
    <>
      {locations.map(location => (
        <React.Fragment key={location.id}>
          <LocationField location={location} />
        </React.Fragment>
      ))}
    </>
  );
};
