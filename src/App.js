import axios from "axios";
import { MotionConfig } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Filter from "./components/Filter";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./components/MovieCard";

const App = () => {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [movieId, setMovieId] = useState(508947);

  const baseUrl = "https://api.themoviedb.org/3";

  //Initalizing the discover movies...
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }${`&page=${pageNumber}`}`
      )
      .then((res) => {
        setDiscover(res.data.results);
        setTotalPage(res.data.total_pages);
      });
  }, [pageNumber, setTotalPage]);

  //getting the movies of a specifica genres
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}${
          activeGenre === 0 ? "" : `&with_genres=${activeGenre}`
        }${`&page=${pageNumber}`}`
      )
      .then((res) => {
        setFiltered(res.data.results);
        setTotalPage(res.data.total_pages);
      });
  }, [activeGenre, pageNumber, setTotalPage]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true`
      )
      .then((res) => {
        setGenres(res.data.genres);
      });
  }, [pageNumber, setTotalPage]);

  //Get Movies with the search Keyword....
  const handleSearch = async () => {
    await axios
      .get(
        `${baseUrl}/search/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&query=${search}&include_adult=true${`&page=${pageNumber}`}`
      )
      .then((res) => {
        setSearchResult(res.data.results);
        setTotalPage(res.data.total_pages);
      });
  };

  return (
    <main className="mx-auto max-w-xs sm:max-w-md md:max-w-screen-md lg:max-w-screen-lg">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        movieId={movieId}
      />

      <Search
        search={search}
        setSearch={setSearch}
        searchRef={searchRef}
        handleSearch={handleSearch}
        setSearchResult={setSearchResult}
        setTotalPage={setTotalPage}
      />
      {searchResult.length ? (
        <>
          <h1 className="pb-5 subtitle font-bold tracking-wide text-gray-100 text-xl">
            Result for: {search}
          </h1>
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
          >
            <AnimatePresence>
              {searchResult?.map((movie) => (
                <MovieCard
                  setShowModal={setShowModal}
                  setMovieId={setMovieId}
                  movie={movie}
                  key={movie.id}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      ) : (
        <>
          <Filter
            discover={discover}
            setFiltered={setFiltered}
            activeGenre={activeGenre}
            setActiveGenre={setActiveGenre}
            genres={genres}
          />
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
          >
            <AnimatePresence>
              {filtered.map((movie) => (
                <MovieCard
                  setShowModal={setShowModal}
                  setMovieId={setMovieId}
                  movie={movie}
                  key={movie.id}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}
      <Pagination totalPage={totalPage} setPageNumber={setPageNumber} />
    </main>
  );
};

export default App;
