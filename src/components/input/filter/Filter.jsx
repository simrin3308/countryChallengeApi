import React, { useEffect, useState } from "react";
import "./filter.css";
import { useDispatch } from "react-redux";
import { setRegion } from "../../../features/countriesSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const regions = ["Africa", "Asia", "Oceania", "Europe", "America"];
  const [filter, setFilter] = useState(null);
  const [displayDropDown, setDisplayDropDown] = useState(false);
  const handleDropDown = () => {
    setDisplayDropDown(!displayDropDown);
  };

  useEffect(() => {
    if (filter !== "") {
      dispatch(setRegion(filter));
    }
  }, [dispatch, filter]);

  return (
    <section className="filter-container">
      <div className="filter" onClick={handleDropDown}>
        <input
          type="text"
          readOnly
          placeholder="Filter by Region"
          className="filter-input"
        />

        <i className="fa-solid fa-angle-down"></i>
      </div>
      {displayDropDown && (
        <div className="dropdown">
          {regions.map((item, index) => {
            return (
              <div
                onClick={() => {
                  handleDropDown();
                  setFilter(item);
                }}
                key={index}
                className="dropdown-item"
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Filter;
