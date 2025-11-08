import React from "react";
import { useForm } from "react-hook-form";
import { TextField, MenuItem, FormControl, InputLabel, Select, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionsForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const categories = [
        {
            value: "Food & Dining",
            label: "Food & Dining",
        },
        {
            value: "Transportation",
            label: "Transportation",
        },
        {
            value: "Shopping",
            label: "Shopping",
        },
        {
            value: "Bills & Utilities",
            label: "Bills & Utilities",
        },
        {
            value: "Entertainment",
            label: "Entertainment",
        },
        {
            value: "Income",
            label: "Income",
        },
        {
            value: "Other",
            label: "Other",
        },
    ];

    const onSubmit = (data) => {
        console.log("Transaction Added:", data);
        toast.success("Transaction added successfully!");
        reset();
      //  window.location.reload();
    };

    return (
        <div className="App">
            <div className="login-card">
                <h2 className="App-title">Add Transaction</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="transaction-form">
                    <Grid container spacing={1}>
                        <TextField
                            label="Amount"
                            type="number"
                            required
                            fullWidth
                            variant="outlined"
                            {...register("amount", {
                                required: "Amount is required",
                                validate: (value) => parseFloat(value) > 0 || "Amount must be greater than 0",
                            })}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                        />
                        <TextField
                            label="Date"
                            type="date"
                            required
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register("date", { required: "Date is required" })}
                            error={!!errors.date}
                            helperText={errors.date?.message}
                        />
                        <TextField
                            label="Description (optional)"
                            fullWidth
                            variant="outlined"
                            {...register("description")}
                        />
                        <TextField
                            select
                            label="Category"
                            required
                            defaultValue=""
                            {...register("category", { required: "Category is required" })}
                            error={!!errors.category}
                            helperText={errors.category?.message}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <input type="submit" value="Add Transaction" />
                    </Grid>
                </form>

                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </div>
    );
};

export default TransactionsForm;
