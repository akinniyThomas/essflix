import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";
import "./Row.css";

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row(props) {
  const [movies, setMovies] = useState([]);

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

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
