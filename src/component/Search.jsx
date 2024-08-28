import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.css";

const Search = ({selectedRegion, handleRegionChange, handleSearch}) => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <FaSearch className={styles.icon} />
        <input type="search" placeholder="Search for a country" onChange={handleSearch}/>
      </div>

      <div>
        <select
          className={styles.filter}
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="All" selected disabled>
            Filter by Region
          </option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

export default Search;


