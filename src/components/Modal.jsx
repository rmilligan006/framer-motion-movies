import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BsStarFill } from "react-icons/bs";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.3 },
  },
};

const Modal = ({ showModal, setShowModal, movieId }) => {
  const [detailMovie, setDetailMovie] = useState([]);
  const [widthGenre, setWidthGenre] = useState(0);
  const [widthCompany, setWidthCompany] = useState(0);
  const sliderGenre = useRef();
  const sliderCompany = useRef();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setDetailMovie(res.data);
      });
  }, [movieId]);

  useEffect(() => {
    showModal &&
      setWidthCompany(
        sliderCompany.current.scrollWidth - sliderCompany.current.offsetWidth
      ) &&
      setWidthGenre(
        sliderGenre.current.scrollWidth - sliderGenre.current.offsetWidth
      );
  }, [showModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          className="fixed overflow-y-auto inset-0 z-[999] bg-black/80"
          onClick={() => setShowModal(false)}
        >
          <div className="min-h-screen px-4 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              className="inline-block w-full max-w-2xl p-5 my-5 glass-modal rounded-lg text-white ring-1 ring-zinc-400"
            >
              <div className="w-full flex flex-col space-y-3">
                <div className="w-full grid grid-cols-2 place-content-between">
                  <div className="flex flex-col space-y-1.5 flex-1">
                    <h3
                      className="title text-xl leading-tight md:text-3xl font-semibold tracking-wide overflow-hidden truncate text-ellipsis hover:text-clip"
                      title={detailMovie?.title}
                    >
                      {detailMovie?.title}
                    </h3>
                    <div className="flex items-center subtitle text-xs md:text-sm divide-x divide-zinc-500">
                      <span className="flex items-center gap-1 pr-1.5">
                        <BsStarFill />
                        {detailMovie?.vote_average}
                      </span>
                      <p className="pl-1.5">
                        {detailMovie?.release_date.substring(0, 4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    <motion.div ref={sliderCompany} className="overflow-hidden">
                      <motion.div
                        drag="x"
                        dragConstraints={{
                          right: 0,
                          left: -widthCompany,
                        }}
                        whileTap={{ cursor: "grabbing" }}
                        className="w-full flex items-center space-x-3 cursor-grab"
                      >
                        {detailMovie?.production_companies.map((company) => (
                          <img
                            src={`https://image.tmdb.org/t/p/original/${company?.logo_path}`}
                            alt="company"
                            className="w-10"
                            title={company?.name}
                            key={company?.id}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
                <motion.div ref={sliderGenre} className="overflow-hidden">
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -widthGenre }}
                    whileTap={{ cursor: "grabbing" }}
                    className="flex item-center gap-2 text-xs w-max md:text-sm subtitle font-light p-1 cursor-grab"
                  >
                    {detailMovie?.genres.map((genre) => (
                      <button
                        className="py-1 px-3 glass rounded-full hover:bg-zinc-400/50 ring-1 ring-zinc-300/30 truncate text-ellipsis"
                        key={genre.id}
                        title={genre.name}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </motion.div>
                </motion.div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${detailMovie?.backdrop_path}`}
                  alt="backdrop"
                  className="object-cover w-full rounded-lg"
                />
                <div className="flex flex-col space-y-2">
                  <h1 className="desc text-lg underline underline-offset-2">
                    Overview
                  </h1>
                  <p className="subtitle font-normal text-sm">
                    {detailMovie?.overview}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
