import React, { Component } from 'react';
import './Main.scss';
import MovieList from '../../components/MovieList/MovieList';
import Search from '../../components/Search/Search';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Main extends Component {
   state = {
      movies: [],
      errorMessage: '',
      loading: true,
      API_URL: `http://www.omdbapi.com/?apikey=${API_KEY}`,
   };
   componentDidMount() {
      fetch(`${this.state.API_URL}&s=spider+man`)
         .then((response) => response.json())
         .then((data) =>
            this.setState({ movies: data.Search, loading: false })
         );
   }

   serchMovie = (search, filter) => {
      this.setState({ loading: true });
      fetch(
         `${this.state.API_URL}&s=${search}${
            filter !== 'all' ? `&type=${filter}` : ''
         }`
      )
         .then((response) => response.json())
         .then((data) => {
            if (data.Response === 'True') {
               this.setState({
                  movies: data.Search,
                  errorMessage: '',
                  loading: false,
               });
            } else if (data.Response === 'False') {
               this.setState({
                  movies: [],
                  errorMessage: `${data.Error}`,
                  loading: false,
               });
               console.log(data.Error);
            }
         });
   };

   render() {
      const { movies, loading } = this.state;

      return (
         <div className="Main">
            <p>{this.state.errorMessage}</p>
            <Search searchMovie={this.serchMovie} />
            {loading ? (
               <div className="lds-facebook">
                  <div></div>
                  <div></div>
                  <div></div>
               </div> //Preloaader https://loading.io/css/
            ) : (
               <MovieList movies={movies} />
            )}
         </div>
      );
   }
}
