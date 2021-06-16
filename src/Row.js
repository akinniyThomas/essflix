import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState([]);

  useEffect(() => {
    //if [], then it run once when the row loads, and don't run again
    async function fetchData() {
      const req = await axiosInstance.get(props.fetchUrl);
      // console.log(req);
      setMovies(req.data.results);
    }
    fetchData();
  }, [props.fetchUrl]);

  //   console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const trailerSetUp = (movie) => {
    console.log(movie);
    console.log(movie?.name || movie?.original_title || movie?.original_name);
    console.log(trailerUrl[1]);
    if (
      trailerUrl[0] &&
      (movie?.name === trailerUrl[1] ||
        movie?.original_title === trailerUrl[1] ||
        movie.original_name === trailerUrl[1])
    ) {
      setTrailerUrl([]);
    } else {
      movieTrailer(
        movie?.name || movie?.original_title || movie?.original_name || ""
      )
        .then((url) => {
          console.log(url);
          const urlTrailerId = new URLSearchParams(new URL(url).search);
          setTrailerUrl([
            urlTrailerId.get("v"),
            movie?.name || movie?.original_title,
          ]);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => trailerSetUp(movie)}
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl[0] && <YouTube videoId={trailerUrl[0]} opts={opts} />}
    </div>
  );
}

export default Row;
