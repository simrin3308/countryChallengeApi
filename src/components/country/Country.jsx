import React, { useEffect } from "react";
import "./country.css";
import { useDispatch, useSelector } from "react-redux";
import {
  searchByRegion,
  showAllCountries,
} from "../../features/countriesAction";
import { Link } from "react-router-dom";

const Country = () => {
  const { countriesData, loading, success, error, region, searchTerm } =
    useSelector((state) => state.country);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAllCountries());
    if (region) {
      dispatch(searchByRegion(region));
    }
  }, [dispatch, region]);

  const data = countriesData.filter((item) => {
    return item.name.common.toLowerCase().includes(searchTerm);
  });

  return (
    <section className="country-container">
      {data.map((item, index) => {
        return (
          <Link to={item.cioc} className="country-card" key={index}>
            <img
              src={item.flags.png}
              alt={item.flag.alt}
              className="country-image"
            />
            <div className="country-content">
              <h3>{item.name.common}</h3>
              <p>
                Population: <span>{item.population}</span>
              </p>
              <p>
                Region: <span>{item.region}</span>
              </p>
              <p>
                Capital: <span>{item.capital}</span>
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Country;
