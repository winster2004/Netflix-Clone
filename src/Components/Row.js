import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    const query = encodeURIComponent(
      `${movie?.title || movie?.name || movie?.original_name} trailer`
    );
    const youtubeSearch = `https://www.youtube.com/results?search_query=${query}`;
    window.open(youtubeSearch, '_blank');
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) =>
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) ? (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Row;


