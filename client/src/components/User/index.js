import React from "react";
import UserLayout from "../../hoc/user";
import MyButton from "../utils/button";

const UserDashboard = () => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>Informacion Personal</h1>
          <div>
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Email</span>
          </div>
          <MyButton
            type="default"
            title="Editar cuenta"
            linkTo="/user/user_profile"
          />
        </div>
        <div className="user_nfo_panel">
          <h1>Historial de compras</h1>
          <div className="user_product_block_wrapper">
            Historial
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
