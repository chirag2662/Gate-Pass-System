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
export default function ProfilePage(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const name = props.name;
  const rollNumber = props.rollNumber;
  const phoneNumber = props.phoneNumber;
  const branch = props.Branch;
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Card sx={{}}>
          <CardHeader
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
            title={<Typography variant="h1">USER PROFILE</Typography>}
          />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <Avatar
                style={{
                  width: "100px",
                  backgroundColor: "",
                  height: "100px",
                  fontSize: "60px",
                }}
              >
                P
              </Avatar>
            </Grid>
          </Grid>
          <CardHeader
            style={{ marginTop: "-10px" }}
            title={
              <TextField
                id="outlined-helperText"
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "-1px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Name
                  </Typography>
                }
                defaultValue={name}
                fullWidth="true"
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                    borderColor: "white",
                  },
                }}
                InputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                  endAdornment: (
                    <Button variant="outlined" endIcon={<EditIcon />}>
                      Edit
                    </Button>
                  ),
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                id="outlined-basic"
                label={<div style={{ marginRight: "12px" }}>Roll Number</div>}
                defaultValue={rollNumber}
                fullWidth="true"
                InputLabelProps={{
                  style: {
                    fontSize: 18,
                    fontFamily: `'Robot', sans-serif`,
                    fontWeight: 900,
                    color: "grey",
                  },
                }}
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
                InputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                  endAdornment: (
                    <Button variant="outlined" endIcon={<EditIcon />}>
                      Edit
                    </Button>
                  ),
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                id="outlined-helperText"
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "-1px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Number
                  </Typography>
                }
                defaultValue={phoneNumber}
                fullWidth="true"
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
                InputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                  endAdornment: (
                    <Button variant="outlined" endIcon={<EditIcon />}>
                      Edit
                    </Button>
                  ),
                }}
              />
            }
          />
          <CardHeader
            style={{ marginTop: "-20px" }}
            title={
              <TextField
                id="outlined-helperText"
                label={
                  <Typography
                    variant="h6a"
                    style={{
                      marginRight: "-1px",
                      marginLeft: "1.5px",
                    }}
                  >
                    Branch
                  </Typography>
                }
                defaultValue={branch}
                fullWidth="true"
                inputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                }}
                InputProps={{
                  style: {
                    color: "grey",
                    fontFamily: `'Robot',sans-serif`,
                    fontWeight: 700,
                  },
                  endAdornment: (
                    <Button variant="outlined" endIcon={<EditIcon />}>
                      Edit
                    </Button>
                  ),
                }}
              />
            }
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
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
            title={<Typography variant="h1">USER REQUESTS</Typography>}
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((elem) => {
                return (
                  <Grid item xs={12} sm={12} md={6} style={{}}>
                    <Requests date="ok" reason="ok" status="no" />
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
