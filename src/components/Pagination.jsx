import React from "react";
import ReactPaginate from "react-paginate";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { motion } from "framer-motion";

const Pagination = ({ totalPage, setPageNumber }) => {
  const onChange = ({ selected }) => {
    setPageNumber(selected + 1);
  };

  return (
    <ReactPaginate
      className="w-full md:w-5/6 lg:w-4/6 text-zinc-200 flex items-center text-sm md:text-base justify-between py-5 md:py-8 desc tracking-wide"
      previousLabel={
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 50 }}
          className="flex items-center gap-1.5 button-filter glass px-4"
        >
          <HiOutlineArrowSmLeft fontSize={25} />
          <span className="text-base hidden md:inline">Prev</span>
        </motion.div>
      }
      nextLabel={
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 25 }}
          className="flex items-center gap-1.5 button-filter glass px-4"
        >
          <span className="text-base hidden md:inline">Next</span>
          <HiOutlineArrowSmRight size={25} />
        </motion.div>
      }
      pageCount={totalPage >= 100 ? 99 : totalPage}
      onPageChange={onChange}
      activeClassName="glass button-filter px-4 ring-1 ring-[#E7F6F2]"
    ></ReactPaginate>
  );
};

export default Pagination;
