import React from "react";
import { VscGithubInverted } from "react-icons/vsc";

const Credit = () => {
  return (
    <div>
      <a
        href="https://github.com/rmilligan006"
        target="_blank"
        rel="norefferrer"
        className="w-full h-full animate-bounce hover:shadow-lg shadow-black hover:scale-110"
      >
        <VscGithubInverted className="w-full h-full" />
      </a>
    </div>
  );
};

export default Credit;
