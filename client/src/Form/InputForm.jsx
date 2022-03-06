import * as React from "react";
import { TextField, Stack, ListItem as Item, Card } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
export default function InputForm() {
  const [value, setValue] = React.useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card style={{ maxWidth: "540px", backgroundColor: "blue" }}>
        <Stack style={{ maxWidth: "540px", backgroundColor: "blue" }}>
          <Item style={{}}>
            <DatePicker
              fullWidth={true}
              disableFuture
              label="Responsive"
              openTo="year"
              views={["year", "month", "day"]}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Item>
          <Item>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Item>
          <Item>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Item>
        </Stack>
      </Card>
    </LocalizationProvider>
  );
}
