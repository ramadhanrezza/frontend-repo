'use client';

import { User } from "@/entities/user";
import { updateUserData } from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

interface UpdateButtonProps {
  setError: (error: string | null) => void;
  userData: User;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ setError, userData }) => {
  const dispatch = useDispatch<AppDispatch>(); 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    try {
      const result = await dispatch(updateUserData({ 
        name: data.get('name') as string, 
        phone: data.get('phone') as string 
      }));

      if (!updateUserData.fulfilled.match(result)) {
        setError(result.payload as string);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } 
      setError('An unexpected error occurred');
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        sx={{ width: '100%' }}
        disabled
        defaultValue={userData.email}
      />
      <TextField
        margin="normal"
        required
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        sx={{ width: '100%' }}
        defaultValue={userData.name}
      />
      <TextField
        margin="normal"
        required
        id="phone"
        label="Phone"
        name="phone"
        autoComplete="phone"
        sx={{ width: '100%' }}
        defaultValue={userData.email}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Update
      </Button>
    </Box>
  )
}

export default UpdateButton;


