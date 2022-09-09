import React, { Component } from 'react';
import './Search.scss';

export default class Search extends Component {
   state = {
      search: 'spider+man',
      filter: 'all',
   };

   handleSearchField = (e) => {
      this.setState({ search: e.target.value.replace(/ /g, '+') });
   };

   handleKey = (event) => {
      if (this.state.search) {
         if (event.key === 'Enter') {
            this.props.searchMovie(this.state.search, this.state.filter);
         }
      }
   };

   handleSearchButton = () => {
      if (this.state.search) {
         this.props.searchMovie(this.state.search, this.state.filter);
      }
   };

   handleFilter = (e) => {
      if (this.state.search) {
         this.setState(
            () => ({ filter: e.target.dataset.type }),
            () => {
               console.log(this.state.search);
               console.log(this.state.filter);
               this.props.searchMovie(this.state.search, this.state.filter);
            }
         );
      }
   };

   render() {
      return (
         <>
            <div className="Search">
               <input
                  className="Search-field"
                  type="text"
                  placeholder="search"
                  value={this.state.serch}
                  onChange={this.handleSearchField}
                  onKeyDown={this.handleKey}
               />
               <button onClick={this.handleSearchButton}>search</button>
            </div>
            <div className="Filter">
               <input
                  type="radio"
                  name="filter"
                  data-type="all"
                  onChange={this.handleFilter}
                  checked={this.state.filter === 'all'}
               ></input>
               <label htmlFor="all">All</label>
               <input
                  type="radio"
                  name="filter"
                  data-type="game"
                  onChange={this.handleFilter}
                  checked={this.state.filter === 'game'}
               ></input>
               <label htmlFor="game">Games</label>
               <input
                  type="radio"
                  name="filter"
                  data-type="movie"
                  onChange={this.handleFilter}
                  checked={this.state.filter === 'movie'}
               ></input>
               <label htmlFor="movie">Movies</label>
               <input
                  type="radio"
                  name="filter"
                  data-type="series"
                  onChange={this.handleFilter}
                  checked={this.state.filter === 'series'}
               ></input>
               <label htmlFor="series">Series</label>
            </div>
         </>
      );
   }
}
