/* eslint-disable */

import {
  FaFireAlt,
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { MdOutlineTune } from "react-icons/md";

import { usePosts } from "core/contexts/posts-context/PostsContext";
import Button from "../button-component/Button";
import "./FilterBar.css";

const FilterBar = () => {
  const { applyFiltersClickHandler, sortFilterType } = usePosts();

  const [showFilterConfigMenu, setShowFilterConfigMenu] = useState(false);

  const handleFilterConfigMenuClick = () => {
    setShowFilterConfigMenu((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    const isClickWithinThreeDots = event.target.closest(".filter-configs");
    if (!isClickWithinThreeDots) {
      setShowFilterConfigMenu(false);
    }
  };

  useEffect(() => {
    setShowFilterConfigMenu(false);
  }, [sortFilterType]);

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-section">
        <h3>{sortFilterType} Tweets</h3>
        <div className="filter-configs">
          <MdOutlineTune
            className="filter-btn"
            size={24}
            onClick={handleFilterConfigMenuClick}
          />
          {showFilterConfigMenu && (
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
              <div className="filter-menu action-btns">
                <Button
                  label={
                    <>
                      <span className="btn-icon">
                        <FaSortAmountUpAlt size={18} />
                      </span>
                      <span className="icon-count">Latest</span>
                    </>
                  }
                  clickHandlerFunction={applyFiltersClickHandler}
                  params={"latest"}
                />
                <Button
                  label={
                    <>
                      <span className="btn-icon">
                        <FaSortAmountDownAlt size={18} />
                      </span>
                      <span className="icon-count">Oldest</span>
                    </>
                  }
                  clickHandlerFunction={applyFiltersClickHandler}
                  params={"oldest"}
                />
                <Button
                  label={
                    <>
                      <span className="btn-icon">
                        <FaFireAlt size={18} />
                      </span>
                      <span className="icon-count">Trending</span>
                    </>
                  }
                  clickHandlerFunction={applyFiltersClickHandler}
                  params={"trending"}
                />
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
