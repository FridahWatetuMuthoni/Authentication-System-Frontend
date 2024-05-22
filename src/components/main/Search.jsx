import { useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";

function Search() {
  const { setSearch } = useGlobalContext();
  const [q, setQ] = useState("");

  const handleChange = (e) => {
    setQ(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(q);
  };

  return (
    <form className="flex rounded-md w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        name="q"
        value={q}
        onChange={handleChange}
        className="w-full p-1 md:p-3 rounded-md rounded-r-none border-2 border-gray-300 outline-violet-700 text-indigo-950"
        placeholder="Search for an image"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-violet-700 text-white  text-sm md:text-lg font-semibold py-1 px-4 md:py-3 md:px-6 rounded-r-md"
      >
        <span>Search</span>
        <svg
          className="text-gray-200 h-3 w-3  md:h-5 md:w-5 p-0 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style={{ enableBackground: "new 0 0 56.966 56.966" }}
          xmlSpace="preserve"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </form>
  );
}

export default Search;
