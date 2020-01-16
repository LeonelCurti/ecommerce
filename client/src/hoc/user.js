import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

const generalLinks = [
  {
    name: "My account",
    linkTo: "/user/dashboard"
  },
  {
    name: "Info de usuario",
    linkTo: "/user/user_profile"
  },
  {
    name: "My Cart",
    linkTo: "/user/cart"
  }
];

const adminLinks = [
  {
    name: "Info del sitio",
    linkTo: "/admin/site_info"
  },
  {
    name: "Agregar producto",
    linkTo: "/admin/add_product"
  },
  {
    name: "Categorias",
    linkTo: "/admin/manage_categories"
  }
];

const UserLayout = props => {
  const generateLinks = links =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <Container>
      <div className="user_container">
        <div className="user_left_nav">
          <h2>Mi cuenta</h2>
          <div className="links">{generateLinks(generalLinks)}</div>
          {props.user.userData.isAdmin ? (
            <div>
              <h2>Administrar</h2>
              <div className="links">{generateLinks(adminLinks)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </Container>
  );
};

const mapStateTopProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateTopProps)(UserLayout);
