import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

function SearchPage({ data, setIsSearchVisible }) {
  const [query, setQuery] = useState("");

  return (
    <div className="fixed inset-0 bg-cyan-950/70 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-xl p-4 rounded border-2 border-[#F5C100]">
        <button
          onClick={() => setIsSearchVisible(false)}
          className="mb-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          Close
        </button>

        <SearchInput query={query} setQuery={setQuery} />

        <SearchResults data={data} query={query} showAllWhenEmpty />
      </div>
    </div>
  );
}

export default SearchPage;