import React from 'react';
import './MovieCard.scss';

export default function MovieCard(props) {
   const {
      Title: title,
      Year: year,
      imdbID: id,
      Type: type,
      Poster: poster,
   } = props;

   return (
      <div className="MovieCard" id={id}>
         <img
            src={
               poster === 'N/A'
                  ? `https://via.placeholder.com/295x430/ACC2F3/FFFFFF?text=${title}`
                  : poster
            }
            alt={title}
            className="MovieCard-poster"
         />
         <div className="MovieCard-content">
            <h4>{type}</h4>
            <h3>{title}</h3>
            <p>{year}</p>
         </div>
      </div>
   );
}
