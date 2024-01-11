import {
  AppBar,
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { navRoutes } from "../routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserAttributes } from "../models/User";
import { Search } from "@mui/icons-material";

const pages = navRoutes.filter((r) => r.name);

export default function Navbar({
  user,
}: {
  user: UserAttributes;
}) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState<string>("");
  const [matches, setMatches] = useState<UserAttributes[]>([]);
  const [users, setUsers] = useState<UserAttributes[]>([]);
  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function navigation(path: string) {
    handleCloseNavMenu();
    navigate(path);
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const matches = users.filter((user) => {
      const userName = user.firstName + " " + user.lastName;
      return userName.toLowerCase().includes(search.toLowerCase());
    });
    setMatches(matches);
  };

  useEffect(() => {
    fetch("http://localhost:9000/api/user")
      .then((res) => res.json())
      .then((data) => {
        const obj = data.filter((obj: any) => obj.id !== user.id);
        setUsers(obj);
      });
  }, [user.id]);

  return (
    <AppBar sx={{ mb: 10 }} position="sticky">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => navigation(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => navigation(page.path)}
                sx={{ my: 2, color: "white", display: "flex" }}
              >
                <Typography noWrap textAlign="center">
                  {page.name}
                </Typography>
              </Button>
            ))}
          </Box>
          {/* <Autocomplete
            disablePortal
            options={users.map((user) => {
                return user.firstName + " " + user.lastName;
            })}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          /> */}
          <FormControl
            component="form"
            onSubmit={handleSearch}
            fullWidth
            sx={{
              position: "relative",
              bgcolor: "white",
              mx: 4,
              borderRadius: 2,
            }}
          >
            <FilledInput
              fullWidth
              hiddenLabel
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              startAdornment={
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  type="submit"
                >
                  <Search />
                </IconButton>
              }
            />
            {matches.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  zIndex: 1,
                  color: "black",
                  maxHeight: 200,
                  boxShadow: 1,
                }}
              >
                <List>
                  {matches.map((user, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setSearch("");
                          setMatches([]);
                          navigation(`/user/${user.id}`);
                        }}
                      >
                        <ListItemText
                          primary={user.firstName + " " + user.lastName}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </FormControl>
          {/* <Button
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                        }}
                    >
                        <NotificationsIcon />
                    </Button> */}
          {/* <Popover
                        id={Boolean(anchorEl) ? 'simple-popover' : undefined}
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => {
                            setAnchorEl(null);
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                    </Popover> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
