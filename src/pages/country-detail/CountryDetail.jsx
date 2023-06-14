import React, { useEffect } from "react";
import "./country-detail.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchByCode } from "../../features/countriesAction";

const CountryDetail = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const { countrySearched } = useSelector((state) => state.country);
  console.log(countrySearched);

  useEffect(() => {
    if (code) {
      dispatch(searchByCode(code.toLocaleLowerCase()));
    }
  }, [dispatch, code]);

  return (
    <section className="country-detail-container">
      <Link className="back-button" to="/">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      <div className="country-detail-content">
        {countrySearched.length > 0 ? (
          <>
            <img
              src={countrySearched[0].flags.png}
              alt="name"
              className="country-detail-image"
            />

            <div className="country-detail-right">
              <h1>{countrySearched[0].name.common}</h1>
              <div className="details">
                <div className="detail-left">
                  <p>
                    Official Name:{" "}
                    <span>{countrySearched[0].name.official}</span>
                  </p>
                  <p>
                    Population: <span>{countrySearched[0].population}</span>
                  </p>
                  <p>
                    Region: <span>{countrySearched[0].region}</span>
                  </p>

                  <p>
                    Sub Region: <span>{countrySearched[0].subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{countrySearched[0].capital}</span>
                  </p>
                </div>

                <div className="detail-right">
                  <p>
                    Top Level Domain: <span>{countrySearched[0].tld}</span>
                  </p>
                  <p>
                    Currencies:
                    <span>
                      {Object.values(countrySearched[0].currencies)
                        .map((item) => {
                          return item.name;
                        })
                        .join(",")}
                    </span>
                  </p>

                  <p>
                    Languages:
                    <span>
                      {Object.values(countrySearched[0].languages)
                        .map((item) => {
                          return item;
                        })
                        .join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border">
                <p>Border Countries:</p>

                {countrySearched[0].borders ? (
                  countrySearched[0].borders.map((item, index) => {
                    return (
                      <Link key={index} to={`/${item}`} className="border-name">
                        <p>{item}</p>
                      </Link>
                    );
                  })
                ) : (
                  <div>No Neighboring Country</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>error </div>
        )}
      </div>
    </section>
  );
};

export default CountryDetail;
