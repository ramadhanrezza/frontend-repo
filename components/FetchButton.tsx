'use client';
import { fetchUserData } from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

interface FetchButtonProps {
  setError: (error: string | null) => void;
  setMessage: (error: string | null) => void;
}

const FetchButton: React.FC<FetchButtonProps> = ({ setError, setMessage }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchUserData = async () => {
    try {
      const result = await dispatch(fetchUserData());

      if (fetchUserData.pending.match(result)) {
        setMessage('Fetch user data loading..')
      } else if (fetchUserData.rejected.match(result)) {
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
    <Button sx={{ mt: 3, mb: 2 }} onClick={handleFetchUserData} variant="contained" color="primary">Fetch User Data</Button>
  )
}

export default FetchButton;