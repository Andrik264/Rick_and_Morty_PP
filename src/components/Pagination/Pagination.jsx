import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

export const Pagination = ({ currentPageId, pageCount, onClick }) => {
  const paginationButtons = [];

  if (pageCount > 11) {
    switch (true) {
      case currentPageId <= 6:
        for (let i = 1; i < 11; i += 1) {
          paginationButtons.push(i);
        }

        break;

      case currentPageId >= pageCount - 4:
        for (let i = pageCount - 9, count = 0; count < 10; count += 1, i += 1) {
          paginationButtons.push(i);
        }

        break;

      default:
        for (let i = currentPageId - 4, count = 0;
          count < 9;
          count += 1, i += 1
        ) {
          paginationButtons.push(i);
        }
    }
  } else {
    for (let i = 1; i <= pageCount; i += 1) {
      paginationButtons.push(i);
    }
  }

  return (
    <nav aria-label="..." className="container pagination-container">
      <ul className="pagination">
        <li
          disabled={currentPageId === 1}
          className="page-item"
        >
          <button
            className="page-link"
            type="button"
            tabitem="-1"
            onClick={() => onClick(currentPageId - 1)}
          >
            Previous
          </button>
        </li>

        {currentPageId > 6 && (
          <>
            <li value="1">
              <button
                type="button"
                className="page-link"
                onClick={() => onClick('1')}
              >
                1
              </button>
            </li>

            <li disabled>
              <button
                type="button"
                className="page-link"
              >
                ...
              </button>
            </li>
          </>
        )}

        {paginationButtons.map(item => (
          <li
            key={item}
            className={classNames(
              'page-item',
              { active: item === currentPageId },
            )}
            value={item}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => onClick(item)}
            >
              {item}
              {item === currentPageId
                && <span className="sr-only">(current)</span>}
            </button>
          </li>
        ))}

        {currentPageId < pageCount - 5 && (
          <>
            <li disabled>
              <button
                type="button"
                className="page-link"
              >
                ...
              </button>
            </li>

            <li value={pageCount}>
              <button
                type="button"
                className="page-link"
                onClick={() => onClick(pageCount)}
              >
                {pageCount}
              </button>
            </li>
          </>
        )}

        <li className="page-item" disabled={currentPageId === pageCount}>
          <button
            className="page-link"
            type="button"
            onClick={() => onClick(currentPageId + 1)}
            disabled={currentPageId === pageCount}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
