import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Contexts
import { useAuthContext } from "../../context/AuthContext";
import { useMaterialUIController } from "../../context/MaterialUIContext";

const Profile = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { user, loading, error } = useAuthContext();

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
    email: user?.email || "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Cancel editing, reset form
      setProfileData({
        fullName: user?.fullName || "",
        bio: user?.bio || "",
        email: user?.email || "",
      });
      setFormErrors({});
    }
    setIsEditing(!isEditing);
    setSuccessMessage("");
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profileData.fullName) {
      errors.fullName = "Full name is required";
    }

    if (!profileData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(profileData.email)) {
      errors.email = "Invalid email format";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaveLoading(true);
      
      // In a real app, this would make an API call to update the user profile
      // For demo purposes, simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} color="text.primary" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your personal information and settings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Profile Overview Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Avatar
                  src={user?.profileImage}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 2,
                    backgroundColor: "primary.main",
                  }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>

                <Typography variant="h5" fontWeight={600} color="text.primary">
                  {user?.fullName || "User"}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, mb: 3 }}
                >
                  @{user?.username || "username"}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box
                  sx={{
                    textAlign: "left",
                    "& .MuiTypography-root + .MuiTypography-root": {
                      mt: 2,
                    },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {user?.email}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Account Type:</strong>{" "}
                    {user?.isAdmin ? "Admin" : "Standard User"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Bio:</strong> {user?.bio || "No bio provided"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Edit Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <CardContent sx={{ py: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight={600} color="text.primary">
                    Profile Information
                  </Typography>

                  {isEditing ? (
                    <Box>
                      <IconButton
                        color="error"
                        onClick={toggleEditMode}
                        sx={{ mr: 1 }}
                      >
                        <CancelIcon />
                      </IconButton>
                      <IconButton
                        color="success"
                        onClick={handleSaveProfile}
                        disabled={saveLoading}
                      >
                        {saveLoading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <SaveIcon />
                        )}
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton color="primary" onClick={toggleEditMode}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      error={!!formErrors.fullName}
                      helperText={formErrors.fullName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                    disabled={saveLoading}
                    sx={{
                      mt: 3,
                      backgroundImage:
                        "linear-gradient(195deg, #42a5f5, #1976d2)",
                      textTransform: "none",
                    }}
                  >
                    {saveLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Profile;