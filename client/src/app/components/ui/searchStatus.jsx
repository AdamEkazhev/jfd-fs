import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number > 4 || number === 1) {
      return number + " человек тусанет с тобой сегодня";
    }
    if (number < 5 && number > 1) {
      return number + " человека тусанут с тобой сегодня";
    }
    if (number === 0) {
      return "Никто с тобой не тусанет";
    }
  };
  return (
    <h2>
      <span className={"badge bg-" + (length === 0 ? "danger" : "primary")}>
        {renderPhrase(length)}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
