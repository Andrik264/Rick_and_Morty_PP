import React from 'react';
import './CharactersCard.scss';

export const CharacterCard = ({ character }) => {
  const {
    name, gender, image, id,
    status, species, type, location,
  } = character;

  return (
    <div
      className="CharactersList__card CharacterCard card"
      style={{ width: '18rem' }}
      data-toggle="modal"
      data-target="#exampleModalCenter"
    >
      <img src={image} alt={name} className="CharacterCard__image" />
      <div className="card-body">
        <div className="card-text">
          {`Name: ${name}`}
        </div>
        <div>
          {`Gender: ${gender}`}
        </div>
        <div>
          {`Status: ${status}`}
        </div>
      </div>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#Character_${id}`} key={id}>
        See details
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id={`Character_${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {`${name}`}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={image} alt={name} className="CharacterCard__image" />
              <div>
                {`Name: ${name}`}
              </div>
              <div>
                {`Status: ${status}`}
              </div>
              <div>
                {`Species: ${species}`}
              </div>
              <div>
                {type && `Type: ${type}`}
              </div>
              <div>
                {`Gender: ${gender}`}
              </div>
              <div>
                {`Planet: ${location.name}`}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
