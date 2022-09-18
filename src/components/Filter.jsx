import React from "react";
import { motion } from "framer-motion";
import Credit from "./Credit";

const Filter = ({ activeGenre, setActiveGenre, genres }) => {
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ delay: 0.25, type: "spring", stiffness: 50 }}
      className="flex items-center gap-x-3 justify-between py-5 md:py-8"
    >
      <select
        name="genres"
        id="genres"
        className="button-filter glass subtitle px-1"
      >
        <option
          value={0}
          className={`text-[E7F6F2] px-2 subtitle ${
            activeGenre === 0 && "active"
          }`}
          onClick={() => setActiveGenre(0)}
        >
          All Genres
        </option>
        {genres.map((genre) => (
          <option
            key={genre.id}
            value={genre.id}
            className={`text-zinc-200 px-2 bg-zinc-800 subtitle ${
              activeGenre === 0 && "active"
            }`}
            onClick={() => setActiveGenre(genre.id)}
          >
            {genre.name}
          </option>
        ))}
      </select>
      <Credit />
    </motion.div>
  );
};

export default Filter;
