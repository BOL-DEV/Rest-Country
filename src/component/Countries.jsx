import styles from "./Countries.module.css";
import Country from "./Country";

const Countries = ({ countries }) => {
  console.log(typeof countries);
  return (
    <div className={styles.container}>
      {countries.countries.map((country, index) => (
        <Country country={country} index={index} key={index} />
      ))}
    </div>
  );
};

export default Countries;
