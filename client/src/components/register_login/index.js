import React from "react";
import Mybutton from "../utils/button";
import Login from "./login";

const RegisterLogin = (props) => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>Nuevos Clientes</h1>
            <p>Si aun no se registro puede crear una cuenta</p>
            <Mybutton
              type="default"
              title="Crear una cuenta"
              linkTo="/register"
              addStyle={{
                margin: "10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
            <h1>Usuarios registrados</h1>
            <p>Si tienes una cuenta por favor inicie sesion.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
