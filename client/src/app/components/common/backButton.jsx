import React from "react";
import { useHistory } from "react-router";
import * as Icon from "react-bootstrap-icons";
const BackHistoryButton = () => {
  const history = useHistory();
  return (
    <button className="btn btn-primary" onClick={() => history.goBack()}>
      <Icon.CaretLeft className="mb-1" />
      Назад
    </button>
  );
};

export default BackHistoryButton;
