import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid } from "@mui/material";
import { toast } from "react-toastify";

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const username = watch("username")?.trim();
        const password = watch("password")?.trim();

        console.log("Submitted:", { username, password });

        if (!username || !password) {
            toast.error("Username and password cannot be empty.");
            return;
        }

        toast.success("Successfully Logged In!");
    };

    console.log("Username: ", watch("username"));
    console.log("Password: ", watch("password"));

    return (
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
    );
};

export default Login;
