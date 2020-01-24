import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const generalLinks = [  
  {
    name: "User info",
    linkTo: "/user/user_profile"
  },
  {
    name: "My Cart",
    linkTo: "/user/cart"
  }
];

const adminLinks = [
  {
    name: "Site info",
    linkTo: "/admin/site_info"
  },
  {
    name: "Add product",
    linkTo: "/admin/add_product"
  },
  {
    name: "Categories",
    linkTo: "/admin/manage_categories"
  }
];

const UserLayout = props => {
  const generateLinks = links =>
    links.map((item, i) => (
      <Link className="btn btn-secondary" to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    
    <div className='container'>
      <div className="user_container row">
       
          <div className="user_left_nav text-center col-sm-3">
            <h2>My account</h2>
            <div className="btn-group-vertical w-100">
              {generateLinks(generalLinks)}
            </div>            
            {
              props.user.userData.isAdmin ? (
                <div className='pt-3'>
                  <h2>Admin</h2>
                  <div className="btn-group-vertical w-100">
                    {generateLinks(adminLinks)}
                  </div>                  
                </div>
              ) : null
            }
          </div>
          <div className="user_right col-sm-9">{props.children}</div>
       
      </div>
    </div>      
    
  );
};

const mapStateTopProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateTopProps)(UserLayout);
