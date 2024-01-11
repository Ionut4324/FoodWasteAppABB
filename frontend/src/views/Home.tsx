import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { UserAttributes } from "../models/User";
import { ProductAttributes } from "../models/Products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../constants";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getColor = (date: Date) => {
  const today = new Date();
  const diff = date.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  if (days < 3) {
    return "error";
  } else if (days < 7) {
    return "warning";
  } else {
    return "primary";
  }
};

const getText = (date: Date) => {
  const today = new Date();
  const diff = date.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  if (days < 3) {
    return "Your product expires in less than 3 days";
  } else if (days < 7) {
    return "Your product expires in less than 7 days";
  } else {
    return "Your product will not expire soon";
  }
};

export default function Home({ user }: { user: UserAttributes }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductAttributes[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:9000/api/product/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const objs: ProductAttributes[] = data.map((obj: any) => {
          const time = Date.parse(obj.expirationDate);
          const date = new Date(time);
          return {
            id: obj.id,
            name: obj.name,
            category: obj.category,
            expirationDate: date,
            quantity: obj.quantity,
            isAvailable: obj.isAvailable,
            userId: obj.userId,
          };
        });
        setProducts(objs);
      });
  }, [user.id]);

  function handleAvailable(product: ProductAttributes) {
    fetch(`http://localhost:9000/api/product/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        category: product.category,
        expirationDate: product.expirationDate,
        quantity: product.quantity,
        isAvailable: !product.isAvailable,
        userId: product.userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const objId = product.id;
        const updatedProducts = products.map((product) => {
          if (product.id === objId) {
            // const time = Date.parse(data.expirationDate);
            // const date = new Date(time);
            return {
              ...product,
              isAvailable: !product.isAvailable,
            };
          }
          return product;
        });
        console.log(updatedProducts);
        setProducts(updatedProducts);
      });
  }

  function handleDelete(product: ProductAttributes) {
    fetch(`http://localhost:9000/api/product/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const objId = product.id;
        const updatedProducts = products.filter(
          (product) => product.id !== objId
        );
        console.log(updatedProducts);
        setProducts(updatedProducts);
      });
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hello, {user?.firstName + " " + user?.lastName}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 5 }}
        onClick={() => navigate("/add-product")}
      >
        Add Product
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Typography noWrap variant="h4" sx={{ mb: 5 }}>
          Your Products
        </Typography>
        <FormControl
          sx={{
            minWidth: 120,
          }}
        >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Age"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            {["", ...categories].map((category) => {
              return (
                <MenuItem value={category}>
                  {category === "" ? "No Filter" : category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Expiration Date</StyledTableCell>
              <StyledTableCell align="right">Actions </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter((product) => {
                if (filter === "") {
                  return true;
                }
                return product.category === filter;
              })
              .map((product: ProductAttributes) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell component="th" scope="row">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.category}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.expirationDate.toLocaleDateString() || ""}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 3 }}
                      onClick={() => handleAvailable(product)}
                    >
                      {product.isAvailable ? "Available" : "Unavailable"}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                    <Tooltip
                      title={
                        <Box sx={{ p: 2 }}>
                          <Typography variant="body2">
                            {getText(product.expirationDate)}
                          </Typography>
                        </Box>
                      }
                      placement="top"
                      arrow
                    >
                      <Button color={getColor(product.expirationDate)}>
                        <NotificationsActiveIcon />
                      </Button>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
