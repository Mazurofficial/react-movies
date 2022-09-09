import React from 'react';
import './MovieList.scss';
import MovieCard from '../MovieCard/MovieCard';

export default function MovieList(props) {
   const { movies } = props;
   return (
      <div className="MovieList">
         {movies.map((movie) => (
            <MovieCard key={movie.imdbID} {...movie} />
         ))}
      </div>
   );
}
