import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const CartIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M7 18C5.9 18 5.01 18.9 5.01 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59 5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63 8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18Z" />
    </SvgIcon>
);

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const cartItems = useSelector((state) => state.cart?.items ?? []);
    const { isAuthenticated = false, user = null } = useSelector((state) => state.auth ?? {});

    const cartCount = cartItems.reduce((total, item) => total + (Number(item?.quantity) || 0), 0);
    const userInitial = user?.email?.charAt(0)?.toUpperCase() || "U";
    const userName = user?.email || "Signed in user";

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                position: "sticky",
                top: 0,
                zIndex: (theme) => theme.zIndex.appBar,
                px: { xs: 1.5, sm: 2.5 },
                py: 2,
                background: "linear-gradient(180deg, rgba(255,247,243,0.96) 0%, rgba(255,247,243,0.82) 70%, rgba(255,247,243,0) 100%)",
                backdropFilter: "blur(8px)",
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
                    color: "#4a342b",
                    boxShadow: "0 10px 30px rgba(255, 87, 34, 0.08)",
                }}
            >
                <Toolbar sx={{ minHeight: 72, gap: 1.5, px: { xs: 2, sm: 3 } }}>
                    <Typography
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            color: "#ff5722",
                            fontSize: { xs: 22, sm: 26 },
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            textDecoration: "none",
                        }}
                    >
                        STORE
                    </Typography>

                    <Button
                        component={Link}
                        to="/cart"
                        variant="outlined"
                        startIcon={<CartIcon sx={{ fontSize: 20 }} />}
                        sx={{
                            borderColor: "#ffd6c8",
                            borderRadius: 999,
                            color: "#4a342b",
                            textTransform: "none",
                            fontWeight: 700,
                        }}
                    >
                        Cart ({cartCount})
                    </Button>

                    {isAuthenticated ? (
                        <>
                            <Button
                                onClick={handleOpenMenu}
                                sx={{
                                    minWidth: 0,
                                    px: 1,
                                    borderRadius: 999,
                                    color: "#4a342b",
                                    textTransform: "none",
                                    gap: 1,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 34,
                                        height: 34,
                                        fontSize: 14,
                                        fontWeight: 700,
                                        bgcolor: "#ff5722",
                                    }}
                                >
                                    {userInitial}
                                </Avatar>
                                <Typography
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                        maxWidth: 140,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        fontWeight: 600,
                                    }}
                                >
                                    {userName}
                                </Typography>
                            </Button>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                            >
                                <MenuItem disabled sx={{ opacity: "1 !important" }}>
                                    {userName}
                                </MenuItem>
                                <MenuItem component={Link} to="/logout" onClick={handleCloseMenu}>
                                    Log Out
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                            sx={{
                                borderRadius: 999,
                                bgcolor: "#ff5722",
                                textTransform: "none",
                                fontWeight: 700,
                                "&:hover": {
                                    bgcolor: "#e64a19",
                                },
                            }}
                        >
                            Log In
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
