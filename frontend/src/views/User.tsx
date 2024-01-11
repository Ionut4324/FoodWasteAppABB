import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductAttributes } from "../models/Products";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { UserAttributes } from "../models/User";

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

export default function User({ user }: { user: UserAttributes }) {
  const { id } = useParams<{ id: string }>();
  const [owner, setOwner] = useState<any>();
  const [userProducts, setUserProducts] = useState<ProductAttributes[]>([]);

  useEffect(() => {
    fetch(`http://localhost:9000/api/product/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const products: ProductAttributes[] = data.map((product: any) => {
          const time = Date.parse(product.expirationDate);
          const date = new Date(time);
          return {
            id: product.id,
            name: product.name,
            expirationDate: date,
            quantity: product.quantity,
            isAvailable: product.isAvailable,
            userId: product.userId,
          };
        });
        const availableProducts = products.filter(
          (product) => product.isAvailable
        );
        setUserProducts(availableProducts);
      });

    fetch(`http://localhost:9000/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOwner(data);
      });
  }, [id]);

  const handleClaim = (id: number) => {
    fetch(`http://localhost:9000/api/product/${id}/claim`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        const products = userProducts.filter((product) => product.id !== id);
        setUserProducts(products);
      });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {owner?.firstName + " " + owner?.lastName}'s Products
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Expiration Date</StyledTableCell>
              <StyledTableCell align="right">Actions </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userProducts.map((product: ProductAttributes) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.quantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.expirationDate.toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClaim(product.id)}
                  >
                    Claim
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
