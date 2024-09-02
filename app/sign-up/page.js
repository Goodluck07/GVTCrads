"use client"; // This line marks the file as a Client Component

import React, { useState } from 'react';
import { Container, Box, Typography, AppBar, Toolbar, TextField, Button } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the import path if necessary
import { useRouter } from 'next/navigation'; // Import useRouter
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // No TypeScript syntax
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter\

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to /app on successful sign-up
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GVTCards
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <TextField 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          fullWidth 
          margin="normal" 
        />
        <TextField 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          fullWidth 
          margin="normal" 
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Already have an account? <Link href="/sign-in">Sign In</Link>
        </Typography>
      </Box>
    </Container>
  );
}
