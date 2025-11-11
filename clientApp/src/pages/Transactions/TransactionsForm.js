import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, MenuItem, Grid } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionsForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [categories, setCategories] = useState([]);

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/categories");
                if (!response.ok) {
                    throw new Error(`Failed to fetch categories (${response.status})`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error loading categories:", error);
                toast.error("Unable to load categories. Please try again later.");
            }
        };
        fetchCategories();
    }, []);

    const onSubmit = async (data) => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (!loggedInUser) {
                toast.error("Please log in first!");
                return;
            }
            //Adds transactions to the backend
            const response = await fetch("http://localhost:5000/api/transactions/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: loggedInUser.UserId,
                    description: data.description?.trim() || null,
                    amount: parseFloat(data.amount),
                    category: data.category,
                    date: data.date,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                console.log("Transaction Added:", data);
                toast.success("Transaction added successfully!");
                reset();
                window.location.reload();
            } else {
                toast.error(result.error || "Failed to add transaction");
            }
        } catch (error) {
            toast.error("Error connecting to server");
            console.log('Error message', error);
        }
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
                            {...register("category", { required: "Category is required" })}
                            error={!!errors.category}
                            helperText={errors.category?.message}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.CategoryId} value={option.Name}>
                                    {option.Name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <input type="submit" value="Add Transaction" />
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default TransactionsForm;
