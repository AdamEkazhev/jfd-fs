import React from "react";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const UserCard = ({ user }) => {
  const history = useHistory();
  const currentUser = useSelector(getCurrentUserData());
  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUser._id === user._id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={handleClick}
          >
            <Icon.Gear className="mb-1" />
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={user.image} className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <Icon.CaretDownFill role="button" color="royalblue" />
              <Icon.CaretUp role="button" />
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
