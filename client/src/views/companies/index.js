import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  Button
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

const Companies = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={600} color="text.primary" gutterBottom>
        Companies
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        View and manage financial companies data
      </Typography>

      <Card sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <BusinessIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          
          <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom>
            Companies Module
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
            This page will display a list of companies with their financial data, market trends, and performance metrics.
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
            This module is in development as part of the merged Loghic application.
          </Alert>
          
          <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
            Explore Demo Data
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Companies;