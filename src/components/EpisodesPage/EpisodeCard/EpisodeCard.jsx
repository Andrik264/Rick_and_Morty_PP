import React from 'react';

export const EpisodeCard = ({ movie }) => {
  const { id, episode, name, air_date, characters } = movie;

  return (
    <tr key={id}>
      <td>{episode}</td>
      <td>{name}</td>
      <td>{air_date}</td>
      <td>{characters.length}</td>
    </tr>
  );
}

