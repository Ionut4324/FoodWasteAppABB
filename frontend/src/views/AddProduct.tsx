import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UserAttributes } from "../models/User";
import { useNavigate } from "react-router-dom";
import { categories } from "../constants";

export default function AddProduct({ user }: { user: UserAttributes }) {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<Dayjs | null>(dayjs());
  const [quantity, setQuantity] = useState<number>(0);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      name,
      category,
      expirationDate,
      quantity,
      isAvailable: false,
      userId: user.id,
    };
    fetch("http://localhost:9000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        expirationDate,
        quantity,
        isAvailable: false,
        userId: user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setName("");
        setCategory("");
        setExpirationDate(dayjs());
        setQuantity(0);
        navigate("/");
      });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Add Product</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Age"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {categories.map((category) => {
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiration Date"
            value={expirationDate}
            onChange={(date) => {
              setExpirationDate(date);
            }}
          />
        </LocalizationProvider>
        <TextField
          label="Quantity"
          variant="outlined"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </Box>
    </Container>
  );
}
