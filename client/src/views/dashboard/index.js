import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Business as BusinessIcon,
  Event as EventIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import axios from "axios";

// Contexts
import { useAuthContext } from "../../context/AuthContext";
import { useMaterialUIController } from "../../context/MaterialUIContext";

const Dashboard = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalEvents: 0,
    totalUsers: 0,
    topGainers: [],
    topLosers: [],
  });

  useEffect(() => {
    // In a real app, this would fetch real data from the API
    // For demo purposes, we'll use mock data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // In production, you would make actual API calls here
        // For demo purposes, just set some example data
        setTimeout(() => {
          setStats({
            totalCompanies: 142,
            totalEvents: 8,
            totalUsers: 857,
            topGainers: [
              { name: "Apple Inc.", symbol: "AAPL", change: 2.5 },
              { name: "Microsoft", symbol: "MSFT", change: 1.8 },
              { name: "Google", symbol: "GOOGL", change: 1.2 },
            ],
            topLosers: [
              { name: "Tesla", symbol: "TSLA", change: -1.5 },
              { name: "Amazon", symbol: "AMZN", change: -0.8 },
              { name: "Meta", symbol: "META", change: -0.6 },
            ],
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} color="text.primary" gutterBottom>
          Welcome back, {user?.fullName || "User"}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with the financial markets today.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "primary.light",
                      mr: 2,
                    }}
                  >
                    <BusinessIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {stats.totalCompanies}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Companies Monitored
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "success.light",
                      mr: 2,
                    }}
                  >
                    <EventIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {stats.totalEvents}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upcoming Events
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "info.light",
                      mr: 2,
                    }}
                  >
                    <GroupIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {stats.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Users
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Top Gainers & Losers */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      Top Gainers
                    </Typography>
                  </Box>
                  
                  {stats.topGainers.map((company, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1.5,
                        borderBottom:
                          index !== stats.topGainers.length - 1
                            ? `1px solid ${
                                darkMode ? "rgba(255,255,255,0.1)" : "#f0f0f0"
                              }`
                            : "none",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={500}
                          color="text.primary"
                        >
                          {company.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {company.symbol}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="success.main"
                      >
                        +{company.change}%
                      </Typography>
                    </Box>
                  ))}

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ textTransform: "none" }}
                    >
                      View All Gainers
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <TrendingDownIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      Top Losers
                    </Typography>
                  </Box>
                  
                  {stats.topLosers.map((company, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1.5,
                        borderBottom:
                          index !== stats.topLosers.length - 1
                            ? `1px solid ${
                                darkMode ? "rgba(255,255,255,0.1)" : "#f0f0f0"
                              }`
                            : "none",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={500}
                          color="text.primary"
                        >
                          {company.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {company.symbol}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="error.main"
                      >
                        {company.change}%
                      </Typography>
                    </Box>
                  ))}

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ textTransform: "none" }}
                    >
                      View All Losers
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;