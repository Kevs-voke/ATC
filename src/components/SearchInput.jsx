function SearchInput({ query, setQuery }) {
    return (
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search programs..."
        className="w-full p-2 border rounded"
      />
    );
  }
  
  export default SearchInput;