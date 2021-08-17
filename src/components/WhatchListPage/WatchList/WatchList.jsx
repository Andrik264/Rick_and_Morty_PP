/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import classNames from 'classnames';

import './WatchList.scss';
import { Button } from '@material-ui/core';

export const WatchList = ({ todos, deleteTodo, changeStatus }) => {
  return (
    <div className="container">
      <ul className="WatchList__list">
        {todos.map((todo) => {
          const { id, name, status } = todo;

          return (
            <li
              key={id}
              className={classNames(
                'WatchList__item',
                `WatchList__item--${status ? 'checked' : 'unchecked'}`,
              )}
            >
              <label>
                <input type="checkbox" readOnly checked={status} />
                <p onClick={() => changeStatus(id)}>
                  {name}
                </p>
              </label>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteTodo(id)}
              >
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
