import React from "react";
import { displayDate } from "../../../utils/displayDate";
import * as Icon from "react-bootstrap-icons";
import { getCurrentUserId, getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const Comment = ({
  content,
  created_at: created,
  _id: id,
  userId,
  onRemove,
}) => {
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between aligh-items-center">
                  <p className="mb-1">
                    {user && user.name}{" "}
                    <span className="small">- {displayDate(created)}</span>{" "}
                  </p>
                  {currentUserId === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex aligh-items-center"
                      onClick={() => onRemove(id)}
                    >
                      <Icon.XLg />
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
