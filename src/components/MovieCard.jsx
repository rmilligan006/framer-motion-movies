import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
  },
};

const MovieCard = ({ movie, setShowModal, setMovieId }) => {
  const settingModal = () => {
    setMovieId(movie.id);
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          whileTap="hover"
          className="relative rounded-lg text-white text-sm md:text-[15px] text-center cursor-pointer transition-all duration-300"
          onClick={settingModal}
        >
          <h2 className="absolute opacity-0 desc font-normal tracking-wider rounded-lg active:opacity-100 hover:opacity-100 flex items-center justify-center inset-0 bg-black/[0.65]">
            {movie.title}
          </h2>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="movie-poster"
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default MovieCard;
