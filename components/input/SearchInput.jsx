"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const SearchInput = (page, perPage) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleFind = () => {
    router.push(`/allTopics?page=1&search=${search}`);
  };
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={handleFind}>find</button>
    </>
  );
};

export default SearchInput;
