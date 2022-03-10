import * as React from "react";
import {
  TextField,
  Stack,
  Grid,
  Typography,
  ListItem as Item,
  Card,
  CardHeader,
  Button,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AppBar from "../AppBar/appBar.jsx";
import GarageIcon from "@mui/icons-material/Garage";
import { DatePicker } from "@mui/lab";
import axiosInstance from "../util/axiosIntance";
import { useNavigate } from "react-router";
export default function InputForm() {
  const [value, setValue] = React.useState(new Date());
  const navigate = useNavigate();
  const [reason, setReason] = React.useState("");
  const [modeOfTravel, setModeOfTravel] = React.useState("");
  async function handleClick(e) {
    const body = {
      modeOfTravel,
      reason,
      Date: value,
    };
    const ans = await axiosInstance.post(
      "http://localhost:9000/api/v1/request/new-request",
      body
    );
    if (ans.status === 200) navigate("/user/profile-page", { replace: true });
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Card
            style={{
              maxWidth: "540px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "",
              alignItems: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Stack
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "",
                alignItems: "center",
                justifyItems: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <Item style={{}}>
                <Typography variant="h5a" style={{ color: "#1976D2" }}>
                  Booking For Gate Pass
                </Typography>
              </Item>
              <Stack>
                <Item style={{}}>
                  <DatePicker
                    label="Date For Travel"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth={true} />
                    )}
                  />
                </Item>
                <Item>
                  <TextField
                    id="outlined-basic"
                    label="Mode Of Travel"
                    value={modeOfTravel}
                    onChange={(e) => setModeOfTravel(e.target.value)}
                    variant="outlined"
                    fullWidth={true}
                    multiline={true}
                    InputProps={{
                      endAdornment: <div style={{ marginLeft: "21px" }}></div>,
                    }}
                  />
                </Item>
                <Item>
                  <TextField
                    id="outlined-basic"
                    label="Reason"
                    variant="outlined"
                    multiline={true}
                    fullWidth={true}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    InputProps={{
                      style: {
                        borderColor: "blue",
                      },
                      endAdornment: <div style={{ marginLeft: "42px" }}></div>,
                    }}
                  />
                </Item>
                <Item>
                  <Button
                    variant="outlined"
                    fullWidth={true}
                    onClick={handleClick}
                  >
                    Submit Request
                  </Button>
                </Item>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
