import "./SearchBar.scss";

export default function SearchBar({ handleSearchInput }) {
  return (
    <>
      <input
        className="search"
        placeholder="Search"
        name="search"
        onChange={handleSearchInput}
      />
    </>
  );
}
