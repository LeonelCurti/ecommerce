import React from "react";
import { Link } from "react-router-dom";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyButton = props => {
  const { type, title, altClass, runAction, linkTo, addStyle } = props;

  const showButton = () => {
    let template = "";
    switch (type) {
      case "default":
        template = (
          <Link
            className={!altClass ? "link_default" : altClass}
            to={linkTo}
            {...addStyle}
          >
            {title}
          </Link>
        );
        break;
      case "bag_link":
        template = (
          <div
            className="bag_link"
            onClick={() => {
              runAction();
            }}
          >
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
        );
        break;
      default:
        template = "";
    }

    return template;
  };

  return <div className="my_link">{showButton()}</div>;
};

export default MyButton;
