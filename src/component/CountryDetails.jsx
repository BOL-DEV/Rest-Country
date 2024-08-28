import { useParams, useNavigate } from "react-router-dom";
import styles from "./CountryDetails.module.css";

const CountryDetails = ({ countries }) => {
  const { countryCode } = useParams();
  const country = countries.find((c) => c.alpha3Code === countryCode);

  const navigate = useNavigate();

  console.log(countries);

  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = country;

  return (
    <>
      <button className={styles.btn} onClick={() => navigate(-1)}>
        &larr; <span> Back</span>
      </button>

      <div className={styles.subContainer}>
        <img src={flag} alt={name} />
        <div>
          <h2>{name}</h2>

          <div className={styles.textFlex}>
            <div>
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong> {population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {region}
              </p>
              <p>
                <strong>Sub Region:</strong> {subregion}
              </p>
              <p>
                <strong>Capital:</strong> {capital}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong> {topLevelDomain}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies.map((c) => c.code)}
              </p>
              <p>
                <strong>Language:</strong>
                {languages.map((l) => l.name).join(", ")}
              </p>
            </div>
          </div>

          <h4>
            <span>Border Countries:</span>
            {borders?.map((b) => (
              <button key={b}>{b}</button>
            ))}
          </h4>
        </div>
      </div>
    </>
  );
};

export default CountryDetails;
