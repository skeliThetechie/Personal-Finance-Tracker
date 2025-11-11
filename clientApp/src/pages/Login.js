import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const username = watch("username")?.trim();
    const password = watch("password")?.trim();

    console.log("Watch:", { username, password });

    const onSubmit = async (username, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/users");

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const users = await response.json();

            const user = users.find((u) => u.Username === username.username && u.Password === username.password);

            if (user) {
                toast.success("Successfully Logged In!");
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                setTimeout(() => {
                navigate("/dashboard"); // Redirect to Dashboard page
                }, 1000);
            } else {
                toast.error("Invalid username or password");
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Failed to connect to the server. Please try again.");
        }
    };

    return (
        <div className="App">
            <div className="login-card">
                <h1 className="App-title">Personal Finance Tracker</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                name="username"
                                required
                                id="outlined-required"
                                label="Username"
                                {...register("username", {
                                    required: "Username is required",
                                    validate: (value) => value.trim() !== "" || "Username cannot be just spaces",
                                })}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }} />
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                required
                                fullWidth
                                autoComplete="current-password"
                                {...register("password", {
                                required: "Password is required",
                                validate: (value) => value.trim() !== "" || "Password cannot be just spaces",
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "hide password" : "show password"}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                ),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }} />
                        <Grid size={{ xs: 12 }}>
                            <input type="submit" />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default Login;
