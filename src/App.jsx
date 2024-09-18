import { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Audio, Hearts } from "react-loader-spinner";

import Navbar from "./component/Navbar";
import Search from "./component/Search";
import Countries from "./component/Countries";
import CountryDetails from "./component/CountryDetails.jsx";
import Loader from "./component/Loader.jsx";
import "./App.css";

// import Spinner from "./component/Spinner";

import "./App.css";

const url = `/data.json`;

const initialState = {
  countries: [],
  filteredCountries: [],
  status: "loading",
  selectedRegion: "All",
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
        status: "ready",
        isLoading: false,
      };

    case "dataFailed":
      return { ...state, status: "ready" };

    case "regionSelected": {
      const filteredCountries =
        action.payload === "All"
          ? state.countries
          : state.countries.filter(
              (country) => country.region === action.payload
            );
      return {
        ...state,
        selectedRegion: action.payload,
        filteredCountries: filteredCountries,
      };
    }

    case "regionSelectedBySearch": {
      const filteredCountries = state.countries.filter((country) =>
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredCountries: filteredCountries,
      };
    }

    default:
      throw new Error("Action Unknown");
  }
};

const App = () => {
  const [
    {  filteredCountries, selectedRegion, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);


  useEffect(() => {
    async function getCountries() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data)
        dispatch({ type: "dataReceived", payload: data.countries });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    getCountries();
  }, []);

  const handleRegionChange = (e) => {
    dispatch({ type: "regionSelected", payload: e.target.value });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    dispatch({ type: "regionSelectedBySearch", payload: searchTerm });
  };

  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <Loader />
              ) : (
                <>
                  <Search
                    selectedRegion={selectedRegion}
                    handleSearch={handleSearch}
                    handleRegionChange={handleRegionChange}
                  />
                  <Countries countries={filteredCountries} />
                </>
              )
            }
          />
          <Route
            path="country/:countryCode"
            element={
              isLoading ? (
                <Hearts
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="three-dots-loading"
                  wrapperStyle
                  wrapperClass
                />
              ) : (
                <CountryDetails countries={filteredCountries} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
