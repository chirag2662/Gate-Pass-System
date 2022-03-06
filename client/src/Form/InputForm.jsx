import * as React from "react";
import { TextField, Stack, ListItem as Item, Card } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import axiosInstance from "../util/axiosIntance";
export default function InputForm() {
  const [date, setDate] = React.useState(new Date());
  const [reason, setReason] = React.useState("");
  const [modeOfTravel, setModeOfTravel] = React.useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      modeOfTravel,
      reason,
      Date: date,
    };
    await axiosInstance.post(
      "http://localhost:9000/api/v1/request/new-request",
      body
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={submitHandler}>
        <Card style={{ maxWidth: "540px", backgroundColor: "blue" }}>
          <Stack style={{ maxWidth: "540px", backgroundColor: "blue" }}>
            <Item style={{}}>
              <DatePicker
                fullWidth={true}
                disableFuture
                label="Responsive"
                openTo="year"
                views={["year", "month", "day"]}
                value={date}
                onChange={(newValue) => {
                  setDate(newValue.target.value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Item>
            <Item>
              <TextField
                id="outlined-basic"
                label="Model of travel"
                variant="outlined"
                onChange={(newValue) => {
                  setModeOfTravel(newValue.target.value);
                }}
              />
            </Item>
            <Item>
              <TextField
                id="outlined-basic"
                label="Reason"
                variant="outlined"
                onChange={(newValue) => {
                  setReason(newValue.target.value);
                }}
              />
            </Item>
          </Stack>
        </Card>
        <button type="submit">Submit</button>
      </form>
    </LocalizationProvider>
  );
}
