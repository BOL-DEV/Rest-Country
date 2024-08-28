import { Link } from "react-router-dom";
import styles from "./Countries.module.css";

const Country = ({ country, index }) => {
    const { name, flag, population, region, capital, alpha3Code } = country;
    const formatPopulationn = population.toLocaleString();
  return (
    <Link key={name} to={`country/${alpha3Code}`}>
      <div key={index} className={styles.country}>
        <img src={flag} alt={name} />
        <div className={styles.text}>
          <h3>{name}</h3>
          <p>
            <strong>Population:</strong> {formatPopulationn}
          </p>
          <p>
            <strong>Region:</strong> {region}
          </p>
          <p>
            <strong>Capital:</strong> {capital}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
