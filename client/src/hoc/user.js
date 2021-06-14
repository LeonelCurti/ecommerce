import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faList,
  faPlus,
  faInfo,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
const generalLinks = [
  {
    name: "User Profile",
    linkTo: "/user/user_profile",
    icon: <FontAwesomeIcon icon={faPhone} className="icon" />,
  },
  {
    name: "My Cart",
    linkTo: "/user/cart",
    icon: <FontAwesomeIcon icon={faShoppingCart} className="icon" />,
  },
];

const adminLinks = [
  {
    name: "Add Product",
    linkTo: "/admin/add_product",
    icon: <FontAwesomeIcon icon={faPlus} className="icon" />,
  },
  {
    name: "Add Categories",
    linkTo: "/admin/manage_categories",
    icon: <FontAwesomeIcon icon={faList} className="icon" />,
  },
  {
    name: "Site info",
    linkTo: "/admin/site_info",
    icon: <FontAwesomeIcon icon={faInfo} className="icon" />,
  },
];

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const UserLayout = (props) => {
  return (
    <div className="container">
      <div className="user_container row">
        <div className="col-sm-4 col-md-3">
          <Paper elevation={2}>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Menu
                </ListSubheader>
              }
            >
              {generalLinks.map((item, i) => {
                return (
                  <ListItemLink
                    key={i}
                    to={item.linkTo}
                    primary={item.name}
                    icon={item.icon}
                  />
                );
              })}
              {props.user.userData.isAdmin &&
                adminLinks.map((item, i) => {
                  return (
                    <ListItemLink
                      key={i}
                      to={item.linkTo}
                      primary={item.name}
                      icon={item.icon}
                    />
                  );
                })}
            </List>
          </Paper>
        </div>
        <div className="col-sm-8 col-md-9">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateTopProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateTopProps)(UserLayout);
