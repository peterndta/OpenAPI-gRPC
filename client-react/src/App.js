import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./App.css";
const defaultField = {
  value: "",
  isTouched: false,
};
const isEmpty = (value) => value.trim().length === 0;
function App() {
  const [studentName, setStudentName] = useState(defaultField);
  const [responseText, setResponseText] = useState("");
  const studentNameChange = (event) => {
    setStudentName((prev) => ({ ...prev, value: event.target.value }));
  };
  const studentNameIsTouched = (event) => {
    setStudentName((prev) => ({ ...prev, isTouched: true }));
  };
  const CallApi = () => {
    axios
      .get(`https://localhost:7212/v1/greeter/${studentName.value}`)
      .then((response) => {
        console.log(response.data.message);
        setResponseText(response.data.message);
      })
      .catch((error) => {
        setResponseText(error.message);
      });
  };
  const studentNameIsValid =
    isEmpty(studentName.value) && studentName.isTouched;
  return (
    <Box maxWidth={1660} sx={{ pt: 2, m: "0 auto", mb: 10 }}>
      <TextField
        required
        id="outlined-student-name-input"
        label="Student Name"
        onChange={studentNameChange}
        value={studentName.value}
        error={studentNameIsValid}
        helperText={studentNameIsValid ? "Name is required" : ""}
        onBlur={studentNameIsTouched}
      />
      <Button
        ml={2}
        disabled={studentName.value ? false : true}
        variant="contained"
        color="primary"
        type="submit"
        onClick={CallApi}
        sx={{ height: 49 }}
      >
        Submit
      </Button>
      <Typography
        mt={2}
        variant="h6"
        sx={{ fontWeight: 600 }}
      >
        {responseText}
      </Typography>
    </Box>
  );
}

export default App;
