import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../axios';
import requests from '../requests';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const results = request.data.results;
      setMovie(results[Math.floor(Math.random() * results.length)]);
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleClick = () => {
    const query = encodeURIComponent(
      `${movie?.title || movie?.name || movie?.original_name} trailer`
    );
    const youtubeSearch = `https://www.youtube.com/results?search_query=${query}`;
    window.open(youtubeSearch, '_blank');
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button onClick={handleClick} className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

