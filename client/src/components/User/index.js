import React from "react";
import UserLayout from "../../hoc/user";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const UserDashboard = ({ user }) => {
  return (
    <UserLayout>
      <Card style={{ padding: "1.5em" }} elevation={2}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: "1.4em" }}
          >
            Personal Information
          </Typography>
          <Typography variant="body1" component="p">
            Name: {user.userData.name}
          </Typography>
          <Typography variant="body1" component="p">
            Last Name: {user.userData.lastname}
          </Typography>
          <Typography variant="body1" component="p">
            Email: {user.userData.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to="/user/user_profile" className="btn btn-primary mt-2">
              Edit
            </Link>
          </Button>
        </CardActions>
      </Card>
    </UserLayout>
  );
};

export default UserDashboard;
