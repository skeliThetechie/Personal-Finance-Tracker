import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const username = watch("username")?.trim();
    const password = watch("password")?.trim();

    console.log("Watch:", { username, password });

    const onSubmit = async (username, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/users");

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const users = await response.json();

            const user = users.find((u) => u.Username === username.username && u.Password === username.password);

            if (user) {
                toast.success("Successfully Logged In!");
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                setTimeout(() => {
                window.location.href = "/dashboard"; // Redirect to Dashboard page
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
                <ToastContainer position="top-center" autoClose={2000} />
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
                                required
                                {...register("password")}
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "Password is required",
                                    validate: (value) => value.trim() !== "" || "Password cannot be just spaces",
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
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
