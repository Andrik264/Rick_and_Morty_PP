import React, { useState, useMemo, useEffect } from 'react';
import { FormControl, MenuItem, Select, TextField } from '@material-ui/core';

import { WatchList } from './WatchList';
import './WatchListPage.scss';
import { NothingFound } from '../NothingFound/NothingFound';

const localStorageKey = 'watchList';

export const WatchListPage = () => {
  const [defaultTodos, setDefaultTodos] = useState([]);
  const [
    filteredTodos,
    setFilteredTodos,
  ] = useState(defaultTodos);
  const [nameToFilter, setNameToFilter] = useState('');
  const [statusToFilter, setStatusToFilter] = useState('all');

  const [newTodoName, setnewTodoName] = useState('');

  useEffect(() => {
    const watchList = JSON.parse(window.localStorage.getItem(localStorageKey));

    if (watchList) {
      setDefaultTodos(watchList);
    }
  }, []);

  useMemo(() => {
    let result = defaultTodos;

    if (nameToFilter) {
      result = result.filter(
        todo => todo.name.toLowerCase()
          .startsWith(nameToFilter.toLowerCase()),
      );
    }

    if (statusToFilter !== 'all') {
      result = result.filter(todo => String(todo.status) === statusToFilter);
    }

    if (nameToFilter.length === 0 && statusToFilter === 'all') {
      setFilteredTodos(defaultTodos);
    } else {
      setFilteredTodos(result);
    }
  }, [nameToFilter, statusToFilter, defaultTodos]);

  function addNewTodo(event) {
    event.preventDefault();

    const watchList = JSON.parse(window.localStorage.getItem(localStorageKey));

    const newTodo = {
      id: watchList ? watchList[watchList.length - 1].id + 1 : 1,
      name: newTodoName,
      status: false,
    };

    window.localStorage.setItem(localStorageKey, JSON.stringify(
      watchList ? [...watchList, newTodo] : [newTodo],
    ));

    const newWatchList = JSON.parse(window.localStorage.getItem(localStorageKey));

    setnewTodoName('');
    setDefaultTodos(newWatchList);
  }

  function deleteTodo(id) {
    const newTodos = defaultTodos.filter(todo => todo.id !== id);

    window.localStorage.setItem(localStorageKey, JSON.stringify(newTodos));
    setDefaultTodos(newTodos);
  }

  function changeStatus(id) {
    const newTodos = defaultTodos.map(todo => (todo.id === id
      ? {
        ...todo,
        status: !todo.status,
      }
      : { ...todo }));

    window.localStorage.setItem(localStorageKey, JSON.stringify(newTodos));
    setDefaultTodos(newTodos);
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="WatchListPage container">
      <div>
        <form onSubmit={addNewTodo}>
          <div className="input-group WatchListPage__add-block">
            <input
              type="text"
              name="EpisodeName"
              value={newTodoName}
              onChange={event => setnewTodoName(event.target.value)}
              className="WatchListPage__add-input"
              minLength="5"
              required
            />
            <button
              type="submit"
              className="btn btn-warning"
            >
              Add episode to watch list
            </button>
          </div>
        </form>
      </div>

      <div className="WatchListPage__filterBlock">
        <div className="WatchListPage__filterName">
          <TextField
            id="standard-full-width"
            label="Name"
            placeholder="Filter by Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={nameToFilter}
            onChange={event => setNameToFilter(event.target.value)}
          />
        </div>

        <div className="WatchListPage__filterStatus">
          <FormControl>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={statusToFilter}
              onChange={event => setStatusToFilter(event.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="true">Completed</MenuItem>
              <MenuItem value="false">Not Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {filteredTodos.length > 0
        ? (
          <WatchList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            changeStatus={changeStatus}
          />
        )
        : <NothingFound />
        }
    </div>
  );
};
