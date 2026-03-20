import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bannerImage =
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80";

const HomeImage = () => {
    const handleShopNowClick = () => {
        const homeSection = document.getElementById("home-products-section");

        if (!homeSection) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const startY = window.scrollY;
        const sectionTop = homeSection.getBoundingClientRect().top + startY;
        const scrollMarginTop = Number.parseFloat(window.getComputedStyle(homeSection).scrollMarginTop || "0") || 0;
        const targetY = Math.max(sectionTop - scrollMarginTop, 0);

        if (prefersReducedMotion) {
            window.scrollTo({ top: targetY });
            homeSection.focus();
            return;
        }

        const duration = 500;
        const distance = targetY - startY;
        const startTime = performance.now();

        const easeInOutCubic = (progress) => {
            if (progress < 0.5) {
                return 4 * progress * progress * progress;
            }

            return 1 - Math.pow(-2 * progress + 2, 3) / 2;
        };

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            window.scrollTo({
                top: startY + distance * easedProgress,
            });

            if (progress < 1) {
                window.requestAnimationFrame(animateScroll);
                return;
            }

            homeSection.focus();
        };

        window.requestAnimationFrame(animateScroll);
    };

    return (
        <Box sx={{ px: { xs: 1.5, sm: 2.5, lg: 4 }, pt: { xs: 1, sm: 1.5 }, pb: { xs: 2, md: 3 } }}>
            <Box
                sx={{
                    maxWidth: 1440,
                    mx: "auto",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: { xs: 4, md: 6 },
                    background: "linear-gradient(135deg, #ffb064 0%, #ff7a00 45%, #ff6a00 100%)",
                    boxShadow: "0 24px 48px rgba(255, 106, 0, 0.18)",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        opacity: 0.3,
                    }}
                >
                    <Box sx={{ position: "absolute", left: { xs: 16, md: 40 }, top: { xs: 20, md: 28 }, width: { xs: 18, md: 22 }, height: { xs: 120, md: 220 }, bgcolor: "#ff8f3a" }} />
                    <Box sx={{ position: "absolute", left: { xs: 46, md: 78 }, top: { xs: 20, md: 28 }, width: { xs: 18, md: 22 }, height: { xs: 120, md: 220 }, bgcolor: "#ffd0a4" }} />
                    <Box sx={{ position: "absolute", right: { xs: 20, md: 40 }, top: { xs: 0, md: 0 }, width: { xs: 18, md: 24 }, height: { xs: 150, md: 320 }, bgcolor: "#ffd0a4" }} />
                    <Box sx={{ position: "absolute", right: { xs: 52, md: 88 }, top: { xs: 0, md: 0 }, width: { xs: 18, md: 24 }, height: { xs: 150, md: 320 }, bgcolor: "#ff8f3a" }} />
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
                        alignItems: "stretch",
                    }}
                >
                    <Box sx={{ position: "relative", p: { xs: 2, sm: 3, md: 4 } }}>
                        <Box
                            sx={{
                                borderRadius: { xs: 4, md: "34px" },
                                overflow: "hidden",
                                minHeight: { xs: 260, sm: 340, md: 430 },
                                bgcolor: "#f4ede7",
                            }}
                        >
                            <Box
                                component="img"
                                src={bannerImage}
                                alt="Fashion sale banner"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                left: { xs: 28, sm: 42, md: 56 },
                                bottom: { xs: 18, sm: 26, md: 36 },
                                bgcolor: "#ff6a00",
                                color: "#ffffff",
                                px: { xs: 2, sm: 2.5, md: 3 },
                                py: { xs: 1.6, sm: 1.8, md: 2.2 },
                                borderRadius: 1.5,
                                boxShadow: "0 18px 32px rgba(255, 106, 0, 0.2)",
                            }}
                        >
                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 800, fontStyle: "italic", lineHeight: 1 }}>
                                DISCOUNT
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 44, sm: 56, md: 64 }, fontWeight: 900, lineHeight: 0.95 }}>
                                50%
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 18, sm: 24 }, fontWeight: 800, lineHeight: 1 }}>
                                OFF
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: { xs: "flex-start", md: "center" },
                            px: { xs: 2.5, sm: 4, md: 5 },
                            pb: { xs: 3.5, md: 0 },
                            pt: { xs: 0, md: 4 },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                                fontSize: { xs: 52, sm: 68, md: 86 },
                                lineHeight: 0.92,
                                letterSpacing: "-0.02em",
                                color: "#ffffff",
                                textAlign: { xs: "left", md: "center" },
                            }}
                        >
                            FASHION
                            <br />
                            SALE
                        </Typography>

                        <Button
                            onClick={handleShopNowClick}
                            variant="outlined"
                            sx={{
                                mt: { xs: 3, md: 4 },
                                px: 3,
                                py: 1,
                                borderColor: "#ffffff",
                                color: "#ffffff",
                                borderRadius: 0.5,
                                textTransform: "none",
                                fontWeight: 800,
                                fontSize: { xs: 16, md: 18 },
                                "&:hover": {
                                    borderColor: "#ffffff",
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                },
                            }}
                        >
                            SHOP NOW
                        </Button>

                        <Box sx={{ display: "flex", gap: 1.5, mt: { xs: 3, md: 4 } }}>
                            {[0, 1, 2].map((dot) => (
                                <Box
                                    key={dot}
                                    sx={{
                                        width: { xs: 16, md: 18 },
                                        height: { xs: 16, md: 18 },
                                        borderRadius: "50%",
                                        bgcolor: dot === 0 ? "#ff6a00" : "rgba(255, 255, 255, 0.5)",
                                        border: "2px solid rgba(255, 255, 255, 0.55)",
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HomeImage;
