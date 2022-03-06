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

export default function request(props) {
  const date = props.date;
  const Reason = props.reason;
  const Status = props.status;
  return (
    <Card variant="outlined" style={{ margin: "10px" }}>
      <CardHeader
        style={{ marginTop: "10px" }}
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
                Date
              </Typography>
            }
            defaultValue={date}
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
            }}
          />
        }
      />
      <CardHeader
        style={{ marginTop: "-20px" }}
        title={
          <TextField
            id="outlined-basic"
            label={<div style={{ marginRight: "12px" }}>Reason</div>}
            defaultValue={Reason}
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
                Status
              </Typography>
            }
            defaultValue={Status}
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
            }}
          />
        }
      />
    </Card>
  );
}
