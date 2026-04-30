import React from "react";

export default function SearchBar() {
  return (
    <div className="flex justify-center w-full my-4">
      <input
        type="text"
        placeholder="Type to search a topic"
        className="
          w-full max-w-md
          bg-white
          border-2 border-[#6135F2]
          rounded-xl
          px-4 py-2
          outline-none
          focus:ring-1 focus:ring-[#6135F2]
          focus:border-[#6135F2]
          transition
        "
      />
    </div>
  );
}