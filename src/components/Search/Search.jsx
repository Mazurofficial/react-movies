import React from 'react';
import { useState } from 'react';

export default function Search(props) {
   const [search, setSearch] = useState('spider+man');
   const [filter, setFilter] = useState('all');

   const handleSearchField = (e) => {
      setSearch(e.target.value);
      // .replace(/ /g, '+')
   };

   const handleKey = (event) => {
      if (search) {
         if (event.key === 'Enter') {
            props.searchMovie(search, filter);
         }
      }
   };

   const handleSearchButton = () => {
      if (search) {
         props.searchMovie(search, filter);
      }
   };

   const handleFilter = (e) => {
      if (search) {
         setFilter(e.target.dataset.type);
         props.searchMovie(search, e.target.dataset.type);
      }
   };

   return (
      <>
         <div className="Search">
            <input
               className="Search-field"
               type="text"
               placeholder="search"
               value={search}
               onChange={handleSearchField}
               onKeyDown={handleKey}
            />
            <button onClick={handleSearchButton}>search</button>
         </div>
         <div className="Filter">
            <input
               type="radio"
               name="filter"
               data-type="all"
               onChange={handleFilter}
               checked={filter === 'all'}
            ></input>
            <label htmlFor="all">All</label>
            <input
               type="radio"
               name="filter"
               data-type="game"
               onChange={handleFilter}
               checked={filter === 'game'}
            ></input>
            <label htmlFor="game">Games</label>
            <input
               type="radio"
               name="filter"
               data-type="movie"
               onChange={handleFilter}
               checked={filter === 'movie'}
            ></input>
            <label htmlFor="movie">Movies</label>
            <input
               type="radio"
               name="filter"
               data-type="series"
               onChange={handleFilter}
               checked={filter === 'series'}
            ></input>
            <label htmlFor="series">Series</label>
         </div>
      </>
   );
}
