"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className="
          p-2 
              bg-primary
              rounded-full 
              text-white
              font-bold
              hover:bg-hover
              border-white
              border-[2px]
              shadow-md

      "
    >
        <BiSearch size={20} />
    </div>
  );
};

export default Search;
