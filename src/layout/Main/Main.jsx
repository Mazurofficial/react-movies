import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Search from '../../components/Search/Search';
import './Main.scss';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Main(props) {
   const [movies, setMovies] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');
   const [loading, setLoading] = useState(true);
   const [API_URL, setAPI_URL] = useState(
      `https://www.omdbapi.com/?apikey=${API_KEY}`
   );

   useEffect(() => {
      fetch(`${API_URL}&s=spider+man`)
         .then((response) => response.json())
         .then((data) => {
            setMovies(data.Search);
            setLoading(false);
         });
   }, [API_URL]);

   const searchMovie = (search, filter) => {
      setLoading(true);
      fetch(
         `${API_URL}&s=${search}${filter !== 'all' ? `&type=${filter}` : ''}`
      )
         .then((response) => response.json())
         .then((data) => {
            if (data.Response === 'True') {
               setMovies(data.Search);
               setErrorMessage('');
               setLoading(false);
            } else if (data.Response === 'False') {
               setMovies([]);
               setErrorMessage(data.Error);
               setLoading(false);
               console.log(data.Error);
            }
         });
   };

   return (
      <div className="Main">
         <p>{errorMessage}</p>
         <Search searchMovie={searchMovie} />
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

// import React, { Component } from 'react';
// import './Main.scss';

// export default class Main extends Component {
//    state = {
//       movies: [],
//       errorMessage: '',
//       loading: true,
//       API_URL: `https://www.omdbapi.com/?apikey=${API_KEY}`,
//    };
//    componentDidMount() {
//       fetch(`${this.state.API_URL}&s=spider+man`)
//          .then((response) => response.json())
//          .then((data) =>
//             this.setState({ movies: data.Search, loading: false })
//          );
//    }

//    serchMovie = (search, filter) => {
//       this.setState({ loading: true });
//       fetch(
//          `${this.state.API_URL}&s=${search}${
//             filter !== 'all' ? `&type=${filter}` : ''
//          }`
//       )
//          .then((response) => response.json())
//          .then((data) => {
//             if (data.Response === 'True') {
//                this.setState({
//                   movies: data.Search,
//                   errorMessage: '',
//                   loading: false,
//                });
//             } else if (data.Response === 'False') {
//                this.setState({
//                   movies: [],
//                   errorMessage: `${data.Error}`,
//                   loading: false,
//                });
//                console.log(data.Error);
//             }
//          });
//    };

//    render() {
//       const { movies, loading } = this.state;

//       return (
//          <div className="Main">
//             <p>{this.state.errorMessage}</p>
//             <Search searchMovie={this.serchMovie} />
//             {loading ? (
//                <div className="lds-facebook">
//                   <div></div>
//                   <div></div>
//                   <div></div>
//                </div> //Preloaader https://loading.io/css/
//             ) : (
//                <MovieList movies={movies} />
//             )}
//          </div>
//       );
//    }
// }
