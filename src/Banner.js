import React, { useState, useEffect } from "react";
import instance from "./axios";
import requests from "./requests";
import "./Banner.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);
  //   const [val, setVal] = useState();
  //   const [state, setstate] = useState();
  //   const [length, setLength] = useState();
  useEffect(() => {
    async function fetchRandomMovie() {
      const req = await instance.get(requests.fetchNetflixOriginals);
      //   setVal();
      setMovie(
        req.data.results[
          Math.floor(Math.random() * req.data.results.length - 1)
        ]
      );
      //   setstate(requests.fetchNetflixOriginals);
      //   setLength(req.data.results.length);
    }
    // return () => {
    fetchRandomMovie();
    // };
  }, []);
  //   console.log(`requests = ${state}`);
  //   console.log(`val is ${val}`);
  //   console.log(`object is ${length}`);
  //   console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
      }}
    >
      {/* background image of white */}
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* <h3>by3</h3> */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* buttons *2 */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
        {/* description */}
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
