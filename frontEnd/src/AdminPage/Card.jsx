import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Requests from "./request";
import axiosInstance from "../util/axiosIntance";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function AdminPage(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // const name = props.name;
  // const rollNumber = props.rollNumber;
  // const phoneNumber = props.phoneNumber;
  // const branch = props.Branch;
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(
        "http://localhost:9000/api/v1/request/admin"
      );
      const req = response.data;
      setRequests(req);
    };
    getUser();
  }, []);

  const removeRequestHandler = (id) => {
    setRequests(requests.filter((req) => req._id !== id));
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Card style={{ margin: "10px" }}>
          <CardHeader
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
            title={<Typography variant="h1">VARIOUS REQUESTS</Typography>}
          />
          <CardContent
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <Button variant="outlined" onClick={handleExpandClick}>
                {!expanded ? `Click Here to See User Requests` : `Close`}
              </Button>
            </Typography>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid container>
              {requests.map((elem) => {
                return (
                  <Grid key={elem._id} item xs={12} sm={12} md={6} style={{}}>
                    <Requests request={elem} onDelete={removeRequestHandler} />
                  </Grid>
                );
              })}{" "}
            </Grid>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}
