import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Search = ({
  search,
  setSearch,
  searchRef,
  handleSearch,
  setSearchResult,
  setTotalPage,
}) => {
  const clear = (e) => {
    e.preventDefault();
    setSearch("");
    searchRef.current.focus();
    setSearchResult([]);
    setTotalPage(100);
  };

  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 15 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
    >
      <div className="relative w-80">
        <div className="relative">
          <input
            type="text"
            ref={searchRef}
            title="Search Input"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a movie!"
            className="w-full focus:outline-none subtitle glass text-[#A5C9CA] px-2.5 pr-14 py-2 rounded-md hover:shadow-lg focus:shadow-lg shadow-black focus:ring-1 ring-zinc-500/75 transition-shadow duration-300 z-50"
          />
          {search && (
            <div
              className="absolute top-2 right-14 text-[#E7F6F2] hover:bg-[#2D4263] rounded-[4px] cursor-pointer p-1"
              onCLick={clear}
              title="Clear search input"
            >
              <FiX fontSize={20} />
            </div>
          )}
        </div>
        <div className="absolute top-0 bottom-0 right-0 px-3.5 glass flex gap-2 items-center justify-center rounded-r-md bg-[#2D4263] cursor-pointer">
          <FiSearch fontSize={20} className={`text-gray-200`} />
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
