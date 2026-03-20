import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const cartItems = useSelector((state) => state.cart?.items ?? []);
    const { isAuthenticated = false, user = null } = useSelector((state) => state.auth ?? {});
    const location = useLocation();
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((total, item) => total + (Number(item?.quantity) || 0), 0);
    const userInitial = user?.email?.charAt(0)?.toUpperCase() || "U";
    const userName = user?.email || "Signed in user";

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearchValue(params.get("search") ?? "");
    }, [location.search]);

    const closeProfileMenu = () => {
        setProfileAnchorEl(null);
    };

    const openProfileMenu = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileClick = (event) => {
        if (isAuthenticated) {
            openProfileMenu(event);
            return;
        }

        navigate("/login");
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const nextSearchValue = searchValue.trim();
        const params = new URLSearchParams();

        if (nextSearchValue) {
            params.set("search", nextSearchValue);
        }

        navigate({
            pathname: "/",
            search: params.toString() ? `?${params.toString()}` : "",
        });
    };

    const mobileNavValue = location.pathname.startsWith("/cart")
        ? "cart"
        : location.pathname.startsWith("/login") || location.pathname.startsWith("/logout")
          ? "profile"
          : "home";

    return (
        <>
            <Box
                elevation={0}
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: (theme) => theme.zIndex.appBar,
                    px: { xs: 1, sm: 2, md: 2.5 },
                    py: 1.5,
                    background: "linear-gradient(180deg, rgba(255,247,243,0.96) 0%, rgba(255,247,243,0.82) 72%, rgba(255,247,243,0) 100%)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <AppBar
                    position="static"
                    color="transparent"
                    elevation={0}
                    sx={{
                        border: "1px solid #ffe2d6",
                        borderRadius: 4,
                        backgroundColor: "#ffffff",
                        color: "#2f241f",
                        boxShadow: "0 12px 32px rgba(255, 87, 34, 0.08)",
                    }}
                >
                    <Toolbar
                        sx={{
                            minHeight: { xs: 74, md: 78 },
                            px: { xs: 1.5, sm: 2.5 },
                            py: { xs: 1.25, md: 0.75 },
                            gap: 1.25,
                            flexWrap: { xs: "wrap", md: "nowrap" },
                        }}
                    >
                        <Box
                            component={Link}
                            to="/"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                textDecoration: "none",
                                color: "inherit",
                                minWidth: "fit-content",
                            }}
                        >
                            <StorefrontRoundedIcon sx={{ color: "#ff5722", fontSize: 28 }} />
                            <Typography
                                sx={{
                                    color: "#ff5722",
                                    fontSize: { xs: 21, sm: 24 },
                                    fontWeight: 800,
                                    letterSpacing: "0.08em",
                                }}
                            >
                                STORE
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleSearchSubmit}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                flex: { md: 1 },
                                width: { xs: "100%", md: "auto" },
                                order: { xs: 3, md: 0 },
                                mt: { xs: 0.5, md: 0 },
                                ml: { md: 1 },
                            }}
                        >
                            <Paper
                                variant="outlined"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flex: 1,
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 999,
                                    borderColor: "#ffd9cd",
                                    bgcolor: "#fff7f3",
                                    boxShadow: "none",
                                }}
                            >
                                <SearchRoundedIcon sx={{ color: "#ff5722", fontSize: 22 }} />
                                <InputBase
                                    value={searchValue}
                                    onChange={(event) => setSearchValue(event.target.value)}
                                    placeholder="Search products"
                                    inputProps={{ "aria-label": "Search products" }}
                                    sx={{
                                        ml: 1,
                                        flex: 1,
                                        fontSize: 15,
                                    }}
                                />
                            </Paper>

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SearchRoundedIcon />}
                                sx={{
                                    display: { xs: "none", sm: "inline-flex" },
                                    borderRadius: 999,
                                    bgcolor: "#ff5722",
                                    px: 2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    boxShadow: "none",
                                    "&:hover": {
                                        bgcolor: "#e64a19",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                Search
                            </Button>

                            <IconButton
                                type="submit"
                                aria-label="Search"
                                sx={{
                                    display: { xs: "inline-flex", sm: "none" },
                                    bgcolor: "#ff5722",
                                    color: "#ffffff",
                                    "&:hover": {
                                        bgcolor: "#e64a19",
                                    },
                                }}
                            >
                                <SearchRoundedIcon />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Button
                                component={Link}
                                to="/cart"
                                variant="outlined"
                                startIcon={
                                    <Badge badgeContent={cartCount} color="error">
                                        <ShoppingCartRoundedIcon />
                                    </Badge>
                                }
                                sx={{
                                    borderRadius: 999,
                                    borderColor: "#ffd9cd",
                                    color: "#2f241f",
                                    px: 1.75,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Cart
                            </Button>

                            <IconButton
                                onClick={handleProfileClick}
                                aria-label={isAuthenticated ? "Open profile menu" : "Go to login page"}
                                sx={{
                                    border: "1px solid #ffd9cd",
                                    bgcolor: "#fff7f3",
                                    color: "#ff5722",
                                }}
                            >
                                {isAuthenticated ? (
                                    <Avatar
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            fontSize: 13,
                                            fontWeight: 700,
                                            bgcolor: "#ff5722",
                                        }}
                                    >
                                        {userInitial}
                                    </Avatar>
                                ) : (
                                    <AccountCircleRoundedIcon />
                                )}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    border: "1px solid #ffe2d6",
                    borderBottom: "none",
                    borderRadius: "18px 18px 0 0",
                    boxShadow: "0 -10px 24px rgba(255, 87, 34, 0.12)",
                    overflow: "hidden",
                    bgcolor: "#ffffff",
                }}
            >
                <BottomNavigation
                    value={mobileNavValue}
                    showLabels
                    sx={{
                        height: 72,
                        bgcolor: "transparent",
                        pb: "env(safe-area-inset-bottom)",
                        "& .MuiBottomNavigationAction-root": {
                            minWidth: 0,
                            color: "#8a6a5c",
                        },
                        "& .Mui-selected": {
                            color: "#ff5722",
                        },
                        "& .MuiBottomNavigationAction-label": {
                            fontSize: 12,
                            fontWeight: 700,
                        },
                    }}
                >
                    <BottomNavigationAction
                        value="home"
                        label="Home"
                        icon={<HomeRoundedIcon />}
                        component={Link}
                        to="/"
                    />
                    <BottomNavigationAction
                        value="cart"
                        label="Cart"
                        icon={
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartRoundedIcon />
                            </Badge>
                        }
                        component={Link}
                        to="/cart"
                    />
                    <BottomNavigationAction
                        value="profile"
                        label="Profile"
                        icon={isAuthenticated ? <Avatar sx={{ width: 24, height: 24, fontSize: 12, bgcolor: "#ff5722" }}>{userInitial}</Avatar> : <AccountCircleRoundedIcon />}
                        onClick={handleProfileClick}
                    />
                </BottomNavigation>
            </Paper>

            {isAuthenticated ? (
                <Menu
                    anchorEl={profileAnchorEl}
                    open={Boolean(profileAnchorEl)}
                    onClose={closeProfileMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <MenuItem disabled sx={{ opacity: "1 !important", maxWidth: 260 }}>
                        <Box>
                            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Signed in as</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 700, whiteSpace: "normal", wordBreak: "break-word" }}>
                                {userName}
                            </Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem component={Link} to="/logout" onClick={closeProfileMenu}>
                        <ListItemIcon sx={{ minWidth: 34 }}>
                            <LogoutRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        Log Out
                    </MenuItem>
                </Menu>
            ) : null}
        </>
    );
};

export default Header;
